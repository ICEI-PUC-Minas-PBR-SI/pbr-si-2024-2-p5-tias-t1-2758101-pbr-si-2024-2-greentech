package API_GREENTCH.pluvial.service;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class WeatherApiResponse {
    private double latitude;
    private double longitude;
    private Daily daily;

    // Getters
    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public Daily getDaily() {
        return daily;
    }

    // Classe interna para mapear o objeto "daily"
    public static class Daily {
        private List<String> time;

        @JsonProperty("rain_sum")  // Mapeia o campo "rain_sum" do JSON para "rainSum" em Java
        private List<Double> rainSum;

        // Getters
        public List<String> getTime() {
            return time;
        }

        public List<Double> getRainSum() {
            return rainSum;
        }
    }
}
