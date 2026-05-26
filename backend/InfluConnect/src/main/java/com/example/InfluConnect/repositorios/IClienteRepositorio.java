package com.example.InfluConnect.repositorios;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.InfluConnect.modelos.Cliente;

@Repository
public interface IClienteRepositorio extends JpaRepository<Cliente, Long> {

    List<Cliente> findByNombre(String nombre);
    List<Cliente> findByApellido(String apellido);
    Optional<Cliente> findByEmail(String email);
    List<Cliente> findByCiudad(String ciudad);
    List<Cliente> findByFechaRegistro(String fechaRegistro);
}
