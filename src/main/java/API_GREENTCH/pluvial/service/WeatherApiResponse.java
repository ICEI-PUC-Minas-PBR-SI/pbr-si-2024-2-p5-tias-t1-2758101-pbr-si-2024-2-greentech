package API_GREENTCH.pluvial.service;

import java.util.List;

public class WeatherApiResponse {
    private double latitude;
    private double longitude;
    public Daily daily;

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public Daily getDaily() {
        return daily;
    }

    public static class Daily {
        private List<String> time;
        private List<Double> rainSum;

        public List<String> getTime() {
            return time;
        }

        public List<Double> getRainSum() {
            return rainSum;
        }

        public Double getRainT() {
            return rainSum.removeFirst();
        }
    }
}
