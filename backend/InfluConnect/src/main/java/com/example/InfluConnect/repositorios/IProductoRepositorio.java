package com.example.InfluConnect.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.InfluConnect.modelos.Producto;

@Repository
public interface IProductoRepositorio extends JpaRepository <Producto, Long> {
    List<Producto> findByCategoria(String categoria);
    List<Producto> findByActivoTrue();
    List<Producto> findByActivoFalse();
    List<Producto> findByNombreContaining(String nombre);
    List<Producto> findByPrecioBetween(Double precioMin, Double precioMax);
    
}
