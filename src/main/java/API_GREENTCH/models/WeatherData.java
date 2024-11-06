package API_GREENTCH.models;

import java.util.List;

public class WeatherData {
    private double latitude;
    private double longitude;
    private List<String> time;
    private List<Double> rainSum;

    public WeatherData(double latitude, double longitude, List<String> time, List<Double> rainSum) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.time = time;
        this.rainSum = rainSum;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public List<String> getTime() {
        return time;
    }

    public List<Double> getRainSum() {
        return rainSum;
    }
}
