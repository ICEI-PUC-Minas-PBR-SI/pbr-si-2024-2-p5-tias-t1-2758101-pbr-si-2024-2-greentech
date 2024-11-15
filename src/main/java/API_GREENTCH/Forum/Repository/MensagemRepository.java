package API_GREENTCH.Forum.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import API_GREENTCH.models.Mensagem;

public interface MensagemRepository extends JpaRepository<Mensagem, Long> {

}