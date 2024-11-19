package API_GREENTCH.Forum.Service;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import API_GREENTCH.Forum.Repository.MensagemRepository;
import API_GREENTCH.Forum.Repository.RespostasRepository;
import API_GREENTCH.exceptions.ResourceNotFoundException;
import API_GREENTCH.models.Mensagem;
import API_GREENTCH.models.Person;
import API_GREENTCH.models.Respostas;

@Service
public class MensagemService {

    private Logger logger = Logger.getLogger(MensagemService.class.getName());

    @Autowired
    private MensagemRepository mensagemRepository;

    @Autowired
    private RespostasRepository respostasRepository;

    // Buscar todas as mensagens
    public List<Mensagem> findAll() {
        logger.info("Finding all messages");
        return mensagemRepository.findAll();
    }

    // Buscar mensagem pelo ID
    public Mensagem findById(Long id) {
        logger.info("Finding message by ID: " + id);
        return mensagemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + id));
    }

    public List<Respostas> findRespostasByMensagemId(Long mensagemId) {
        return respostasRepository.findByMensagemPaiId(mensagemId);
    }

    // Criar nova mensagem
    public Mensagem createMensagem(Mensagem mensagem) {
        logger.info("Creating a new message");
        return mensagemRepository.save(mensagem);
    }

    // Atualizar mensagem
    public Mensagem updateMensagem(Long id, Mensagem mensagemUpdates) {
        Mensagem existingMensagem = mensagemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + id));

        // Atualiza o conteúdo da mensagem
        existingMensagem.setConteudo(mensagemUpdates.getConteudo());

        return mensagemRepository.save(existingMensagem);
    }

    // Deletar mensagem
    public void deleteMensagem(Long id) {
        Mensagem mensagem = mensagemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + id));
        mensagemRepository.delete(mensagem);
    }

    // Curtir mensagem
    public void curtirMensagem(Long id) {
        Mensagem mensagem = mensagemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + id));
        mensagem.curtir();
        mensagemRepository.save(mensagem);
    }

    // Descurtir mensagem
    public void descurtirMensagem(Long id) {
        Mensagem mensagem = mensagemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + id));
        mensagem.descurtir();
        mensagemRepository.save(mensagem);
    }


    public void curtirResposta(Long id) {
        Respostas mensagem = respostasRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + id));
        mensagem.curtir();
        respostasRepository.save(mensagem);
    }

    // Descurtir mensagem
    public void descurtirResposta(Long id) {
        Respostas mensagem = respostasRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + id));
        mensagem.descurtir();
        respostasRepository.save(mensagem);
    }
    // Responder mensagem
    public Respostas responderMensagem(Long idMensagem, Respostas resposta) {
        // Buscar a mensagem pai
        Mensagem mensagemPai = mensagemRepository.findById(idMensagem)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + idMensagem));

        // Configurar a relação entre a resposta e a mensagem pai
        resposta.setMensagemPai(mensagemPai);

        // Salvar a resposta no repositório
        return respostasRepository.save(resposta);
    }
}
