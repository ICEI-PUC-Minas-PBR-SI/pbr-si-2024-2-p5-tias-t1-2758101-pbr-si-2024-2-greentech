package API_GREENTCH.pluvial.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import API_GREENTCH.models.PluvialEconomy;

@Repository
public interface PluvialEconomyRepository extends JpaRepository<PluvialEconomy, Long> {}


