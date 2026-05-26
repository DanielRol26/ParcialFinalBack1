package com.example.InfluConnect.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.InfluConnect.modelos.Testimonio;

@Repository
public interface ITestimonioRepositorio extends JpaRepository<Testimonio, Long> {
    List<Testimonio> findByAprobadoTrue();
    List<Testimonio> findByAprobadoFalse();
    List<Testimonio> findByCalificacionGreaterThanEqual(Integer calificacion);
    List<Testimonio> findByCalificacionLessThanEqual(Integer calificacion);
    List<Testimonio> findByCalificacionBetween(Integer calificacionMin, Integer calificacionMax);
}
