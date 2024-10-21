package API_GREENTCH.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "fotovoltaico_economy")
public class FotovoltaicoEconomy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private int user_id;

    @Column(name = "average_economy_kw", nullable = false)
    private double average_economy_kw;

    @Column(name = "average_consumption", nullable = false)
    private double average_consumption;

    @Column(name = "average_bill_value", nullable = false)
    private double average_bill_value;

    @Column(name = "public_lighting", nullable = false)
    private double public_lighting;

    @Column(name = "min_bill_value", nullable = false)
    private double min_bill_value;

    public FotovoltaicoEconomy() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public double getAverage_economy_kw() {
        return average_economy_kw;
    }

    public void setAverage_economy_kw(double average_economy_kw) {
        this.average_economy_kw = average_economy_kw;
    }

    public double getAverage_consumption() {
        return average_consumption;
    }

    public void setAverage_consumption(double average_consumption) {
        this.average_consumption = average_consumption;
    }

    public double getAverage_bill_value() {
        return average_bill_value;
    }

    public void setAverage_bill_value(double average_bill_value) {
        this.average_bill_value = average_bill_value;
    }

    public double getPublic_lighting() {
        return public_lighting;
    }

    public void setPublic_lighting(double public_lighting) {
        this.public_lighting = public_lighting;
    }

    public double getMin_bill_value() {
        return min_bill_value;
    }

    public void setMin_bill_value(double min_bill_value) {
        this.min_bill_value = min_bill_value;
    }
}
