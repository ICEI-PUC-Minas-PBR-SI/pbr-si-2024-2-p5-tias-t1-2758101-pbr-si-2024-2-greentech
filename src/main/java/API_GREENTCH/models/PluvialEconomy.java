package API_GREENTCH.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pluvial_economy")
public class PluvialEconomy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private int user_id;

    @Column(name = "endereco_id", nullable = false)
    private int endereco_id;

    @Column(name = "first_quarter_captaion", nullable = false)
    private double first_quarter_captaion;

    @Column(name = "second_quarter_captaion", nullable = false)
    private double second_quarter_captaion;

    @Column(name = "third_quarter_captaion", nullable = false)
    private double third_quarter_captaion;

    @Column(name = "fourth_quarter_captaion", nullable = false)
    private double fourth_quarter_captaion;

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

    public int getEndereco_id() {
        return endereco_id;
    }

    public void setEndereco_id(int endereco_id) {
        this.endereco_id = endereco_id;
    }

    public double getFirst_quarter_captaion() {
        return first_quarter_captaion;
    }

    public void setFirst_quarter_captaion(double first_quarter_captaion) {
        this.first_quarter_captaion = first_quarter_captaion;
    }

    public double getSecond_quarter_captaion() {
        return second_quarter_captaion;
    }

    public void setSecond_quarter_captaion(double second_quarter_captaion) {
        this.second_quarter_captaion = second_quarter_captaion;
    }

    public double getThird_quarter_captaion() {
        return third_quarter_captaion;
    }

    public void setThird_quarter_captaion(double third_quarter_captaion) {
        this.third_quarter_captaion = third_quarter_captaion;
    }

    public double getFourth_quarter_captaion() {
        return fourth_quarter_captaion;
    }

    public void setFourth_quarter_captaion(double fourth_quarter_captaion) {
        this.fourth_quarter_captaion = fourth_quarter_captaion;
    }

    public PluvialEconomy() {
    }
}
