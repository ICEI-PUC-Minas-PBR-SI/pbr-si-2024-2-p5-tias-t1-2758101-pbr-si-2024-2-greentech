package API_GREENTCH.models;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Respostas implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String conteudo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mensagem_id", nullable = false) // Relacionamento com Mensagem
    @JsonIgnore
    private Mensagem mensagemPai;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false) // Relacionamento com Usuário
    private Person usuario;


    @Column(nullable = false)
    private int contadorCurtidas;

    
    public int getContadorCurtidas() {
        return contadorCurtidas;
    }

    public void curtir() {
        this.contadorCurtidas++;
    }

    public void descurtir() {
       if (this.contadorCurtidas >0){
        this.contadorCurtidas--;
       }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public Mensagem getMensagemPai() {
        return mensagemPai;
    }

    public void setMensagemPai(Mensagem mensagemPai) {
        this.mensagemPai = mensagemPai;
    }

    public Person getUsuario() {
        return usuario;
    }

    public void setUsuario(Person usuario) {
        this.usuario = usuario;
    }

}
