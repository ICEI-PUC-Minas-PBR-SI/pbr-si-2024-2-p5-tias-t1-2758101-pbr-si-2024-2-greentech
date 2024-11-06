package API_GREENTCH.pluvial.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import API_GREENTCH.models.WeatherData;

@Service
public class WeatherService {

    private static final String BASE_URL = "https://archive-api.open-meteo.com/v1/archive";

    public WeatherData createApi(float latitude, float longitude) {
        RestTemplate restTemplate = new RestTemplate();

        // Obtém a data atual e a data do ano anterior
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusYears(1);

        // Montando a URI com todos os parâmetros necessários
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("latitude", latitude)
                .queryParam("longitude", longitude)
                .queryParam("start_date", startDate)
                .queryParam("end_date", endDate)
                .queryParam("daily", "rain_sum")
                .queryParam("timezone", "GMT")
                .toUriString();


        // Faz a chamada à API e mapeia a resposta para WeatherApiResponse
        WeatherApiResponse response = restTemplate.getForObject(url, WeatherApiResponse.class);
        
        if (response != null && response.getDaily() != null) {
            return new WeatherData(
                    response.getLatitude(),
                    response.getLongitude(),
                    response.getDaily().getTime(),
                    response.getDaily().getRainSum());
        }
        return null;
    }
}