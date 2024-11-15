package API_GREENTCH.Forum.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import API_GREENTCH.Forum.Service.MensagemService;
import API_GREENTCH.models.Mensagem;
import API_GREENTCH.models.Respostas;

@RestController
@RequestMapping("/mensagem")
public class MensagemController {

    @Autowired
    private MensagemService service;

    // Endpoint para listar todas as mensagens
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Mensagem> findAll() {
        return service.findAll();
    }

    // Endpoint para buscar uma mensagem pelo ID
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mensagem findById(@PathVariable Long id) {
        return service.findById(id);
    }

    // Endpoint para criar uma nova mensagem
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mensagem create(@RequestBody Mensagem mensagem) {
        return service.createMensagem(mensagem);
    }

    // Endpoint para atualizar uma mensagem pelo ID
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mensagem update(@PathVariable Long id, @RequestBody Mensagem mensagemUpdates) {
        return service.updateMensagem(id, mensagemUpdates);
    }

    // Endpoint para deletar uma mensagem pelo ID
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteMensagem(id);
    }

    // Endpoint para curtir uma mensagem
    @PostMapping(value = "/{id}/curtir", produces = MediaType.APPLICATION_JSON_VALUE)
    public void curtir(@PathVariable Long id) {
        service.curtirMensagem(id);
    }

    // Endpoint para descurtir uma mensagem
    @PostMapping(value = "/{id}/descurtir", produces = MediaType.APPLICATION_JSON_VALUE)
    public void descurtir(@PathVariable Long id) {
        service.descurtirMensagem(id);
    }

    @PostMapping(value = "/resposta/{id}/curtir", produces = MediaType.APPLICATION_JSON_VALUE)
    public void curtirResposta(@PathVariable Long id) {
        service.curtirResposta(id);
    }

    // Endpoint para descurtir uma mensagem
    @PostMapping(value = "/resposta/{id}/descurtir", produces = MediaType.APPLICATION_JSON_VALUE)
    public void descurtirResposta(@PathVariable Long id) {
        service.descurtirResposta(id);
    }

    // Endpoint para responder a uma mensagem específica
    @PostMapping(value = "/{id}/responder", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Respostas responder(@PathVariable Long id, @RequestBody Respostas resposta) {
        return service.responderMensagem(id, resposta);
    }

    // Endpoint para listar respostas de uma mensagem específica
    @GetMapping(value = "/{id}/respostas", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Respostas> getRespostas(@PathVariable Long id) {
        return service.findRespostasByMensagemId(id);
    }
}
