package API_GREENTCH.models;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "enderecos")
public class Endereco implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long endereco_id;

    @ManyToOne
    @JoinColumn(name = "person_id", nullable = true)
    @JsonIgnore
    private Person person;

    @Column(name ="logradouro", nullable = false)
    private String logradouro;

    @Column(name ="number", nullable = false)
    private String number;

    @Column
    private String cep;

    @Column
    private float latitude;

    @Column
    private float longitude;


    public void setLongitude(float f) {
        this.longitude = f;
    }


    public Endereco() {}


    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }


    public void setLatitude(float latitude) {
      this.latitude = latitude;
    }
}
