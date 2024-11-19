package API_GREENTCH.Forum.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import API_GREENTCH.models.Respostas;

public interface RespostasRepository extends JpaRepository<Respostas, Long> {

    List<Respostas> findByMensagemPaiId(Long mensagemId);
}
