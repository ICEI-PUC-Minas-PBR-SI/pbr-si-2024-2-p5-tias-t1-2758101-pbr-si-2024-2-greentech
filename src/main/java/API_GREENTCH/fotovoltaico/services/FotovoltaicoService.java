package API_GREENTCH.fotovoltaico.services;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import API_GREENTCH.fotovoltaico.repositories.FotovoltaicoEconomyRepository;
import API_GREENTCH.models.FotovoltaicoEconomy;

@Service
public class FotovoltaicoService {
    @Autowired
    private FotovoltaicoEconomyRepository fotovoltaicoEconomyRepository;

    private FotovoltaicoEconomy storeEconomyData(Map<String, Object> data, int userId) {
        FotovoltaicoEconomy economy = new FotovoltaicoEconomy();
        economy.setUser_id(userId);
        economy.setPublic_lighting((Double) data.get("publicLighting"));
        economy.setAverage_consumption((Double) data.get("averageConsumptionKw"));
        economy.setAverage_bill_value((Double) data.get("averageBillValue"));
        economy.setAverage_economy_kw((Double) data.get("averageBillEconomy"));
        economy.setMin_bill_value((Double) data.get("minBillValue"));

        return fotovoltaicoEconomyRepository.save(economy);
    }

    private double calculateKwAverageConsumption(int[] consumption) {
        return Arrays.stream(consumption).sum() / 6;
    }

    private Map<String, Object> minConnectionKwConsumption(String connection) {
        Map<String, Object> response = new HashMap<>();
        switch (connection) {
            case "monofasico":
                response.put("status", "success");
                response.put("value", 30);
                break;
            case "bifasico":
                response.put("status", "success");
                response.put("value", 50);
                break;
            case "trifasico":
                response.put("status", "success");
                response.put("value", 100);
                break;
            default:
                response.put("status", "error");
                response.put("value", null);
                break;
        }

        return response;
    }

    private double calculatepublicLighting(double billValue, double kwValue, int billConsumption) {
        return billValue - (billConsumption * kwValue);
    }

    private double calculateMinBillValue(double publicLighting, int minConsumption, double kw){
        return minConsumption * kw + publicLighting;
    }

    public Map<String, Object> calculateEconomy(Map<String, Object> requestData) {
        Map<String, Object> data = new HashMap<>();

        // Obter e converter dados da requisição
        List<Integer> consumptionList = (List<Integer>) requestData.get("consumptionList");
        int[] consumption = consumptionList.stream().mapToInt(Integer::intValue).toArray();
        int lastBillConsumption = (int) requestData.get("lastBillConsumption");
        double lastBillValue = Double.parseDouble(String.valueOf(requestData.get("lastBillValue")));
        double kwValue = Double.parseDouble(String.valueOf(requestData.get("kwValue")));
        String connection = (String) requestData.get("connection");
        int user_id = (int) requestData.get("userId");

        // Obter dados de consumo mínimo
        Map<String, Object> minKwConsumptionData = this.minConnectionKwConsumption(connection);
        String status = (String) minKwConsumptionData.get("status");

        // Verificar status de conexão
        if ("error".equals(status)) {
            return createResponse(data, "Tipo de conexão inválida", "error", 200);
        }

        // Cálculos
        int minKwConsumption = (int) minKwConsumptionData.get("value");
        double kwAverageConsumption = this.calculateKwAverageConsumption(consumption);
        double publicLighting = this.calculatepublicLighting(lastBillValue, kwValue, lastBillConsumption);
        double minBillValue = this.calculateMinBillValue(publicLighting, minKwConsumption, kwValue);
        double averageBillValue = kwValue * kwAverageConsumption + publicLighting;
        double averageBillEconomy = averageBillValue - (minBillValue + (averageBillValue * 0.15)); // 15% de imposto

        // Preparar payload da resposta com formatação
        data.put("averageConsumptionKw", roundToTwoDecimalPlaces(kwAverageConsumption));
        data.put("averageBillValue", roundToTwoDecimalPlaces(averageBillValue));
        data.put("minBillValue", roundToTwoDecimalPlaces(minBillValue));
        data.put("averageBillEconomy", roundToTwoDecimalPlaces(averageBillEconomy));
        data.put("publicLighting", roundToTwoDecimalPlaces(publicLighting));
        this.storeEconomyData(data, user_id);
    
        // Preparar resposta
        return createResponse(data, "Economia calculada com sucesso", "success", 200);
    }

    private double roundToTwoDecimalPlaces(double value) {
        BigDecimal bd = new BigDecimal(value);
        bd = bd.setScale(2, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

    private Map<String, Object> createResponse(Map<String, Object> data, String message, String status, int code) {
        Map<String, Object> response = new HashMap<>();
        response.put("code", code);
        response.put("status", status);
        response.put("message", message);
        response.put("payload", data);
        return response;
    }
}
