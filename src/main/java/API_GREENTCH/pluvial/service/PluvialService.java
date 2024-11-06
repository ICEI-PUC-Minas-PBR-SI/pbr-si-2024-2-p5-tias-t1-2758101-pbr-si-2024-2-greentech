package API_GREENTCH.pluvial.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import API_GREENTCH.exceptions.ResourceNotFoundException;
import API_GREENTCH.login.repositories.EnderecoRepository;
import API_GREENTCH.login.repositories.PersonRepository;
import API_GREENTCH.login.services.EnderecoService;
import API_GREENTCH.models.Endereco;
import API_GREENTCH.models.Person;
import API_GREENTCH.models.PluvialEconomy;
import API_GREENTCH.models.WeatherData;
import API_GREENTCH.pluvial.repository.PluvialEconomyRepository;

@Service
public class PluvialService {

    @Autowired
    private PluvialEconomyRepository pluvialRepository;

    @Autowired
    private EnderecoService enderecoService;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private WeatherService aWeatherService;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String OPEN_METEO_API_URL = "https://archive-api.open-meteo.com/v1/archive";

    public Map<String, Object> calculate(Long id, int area) {

        Optional<Endereco> endereco = enderecoService.getEndereco(id);

        // Verifica se o endereço existe e lança exceção se estiver vazio
        Endereco enderecoEncontrado = endereco
                .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado"));

        WeatherData resp = aWeatherService.createApi(enderecoEncontrado.getLatitude(),
                enderecoEncontrado.getLongitude());

        Double[] trimestesDoubles = sumQuarters(resp);

        PluvialEconomy pluvialEconomy = CreatePluvialRegister(sumQuarters(resp), enderecoEncontrado.getEndereco_id(),
                area, enderecoEncontrado.getPerson());

        pluvialRepository.save(pluvialEconomy);

        // Monta o Map com as informações da PluvialEconomy
        Map<String, Object> response = new HashMap<>();
        response.put("pluvialEconomy", pluvialEconomy); // Adiciona a entidade completa ao Map

        return response;

    }

    private Double[] sumQuarters(WeatherData resp) {
        Double[] quartersSum = new Double[4];
        for (int i = 0; i < 4; i++) {
            quartersSum[i] = 0.0; // Inicializa cada posição do vetor com zero
        }

        int quarterSize = resp.getRainSum().size() / 4;

        for (int i = 0; i < 4; i++) {
            for (int j = i * quarterSize; j < (i + 1) * quarterSize; j++) {
                quartersSum[i] += resp.getRainSum().get(j);
            }
        }

        return quartersSum;
    }

    private PluvialEconomy CreatePluvialRegister(Double[] sumQuarters, Long id, int area, Person person) {
        PluvialEconomy resp = new PluvialEconomy();
        resp.setEndereco_id((int) id.longValue());

        // Calcula e arredonda cada trimestre
        resp.setFirst_quarter_captaion(roundToTwoDecimalPlaces(area * sumQuarters[0]));
        resp.setSecond_quarter_captaion(roundToTwoDecimalPlaces(area * sumQuarters[1]));
        resp.setThird_quarter_captaion(roundToTwoDecimalPlaces(area * sumQuarters[2]));
        resp.setFourth_quarter_captaion(roundToTwoDecimalPlaces(area * sumQuarters[3]));
        resp.setUser_id((int) person.getId().longValue());

        return resp;
    }

    private double roundToTwoDecimalPlaces(double value) {
        return new BigDecimal(value).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

}
