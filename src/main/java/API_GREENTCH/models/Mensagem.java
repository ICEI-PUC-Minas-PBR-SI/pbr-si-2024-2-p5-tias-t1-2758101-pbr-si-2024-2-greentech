package API_GREENTCH.models;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Forum")
public class Mensagem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String conteudo;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Person usuario;

    @Column(nullable = false)
    private int contadorCurtidas;

    @OneToMany(mappedBy = "mensagemPai", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Respostas> respostas;

    // Getters e Setters

    public List<Respostas> getRespostas() {
        return respostas;
    }

    public void setRespostas(List<Respostas> respostas) {
        this.respostas = respostas;
    }

    public Mensagem() {
    }

    public Mensagem(Long id, String conteudo, Person usuario) {
        this.id = id;
        this.conteudo = conteudo;
        this.usuario = usuario;
        this.contadorCurtidas = 0;
    }

    // Getters e setters
    public Long getId() {
        return id;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public Person getUsuario() {
        return usuario;
    }

    public void setUsuario(Person usuario) {
        this.usuario = usuario;
    }

    public int getContadorCurtidas() {
        return contadorCurtidas;
    }

    public void curtir() {
        contadorCurtidas++;
    }

    public void descurtir() {
        if (contadorCurtidas > 0) {
            contadorCurtidas--;
        }
    }
}
