package com.example.InfluConnect.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.InfluConnect.modelos.Campana;

@Repository
public interface ICampanaRepositorio extends JpaRepository<Campana, Long> {

    List<Campana> findByNombre(String nombre);
    List<Campana> findByPlataforma(String plataforma);
    List<Campana> findByFechaInicio(String fechaInicio);
    List<Campana> findByFechaFin(String fechaFin);
    List<Campana> findByPresupuesto(String presupuesto);

}
