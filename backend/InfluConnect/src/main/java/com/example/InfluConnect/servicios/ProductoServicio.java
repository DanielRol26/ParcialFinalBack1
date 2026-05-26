package com.example.InfluConnect.servicios;

import com.example.InfluConnect.modelos.Producto;
import com.example.InfluConnect.repositorios.IProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServicio {

    @Autowired
    private IProductoRepositorio productoRepositorio;

    public List<Producto> listarTodos() {
        return productoRepositorio.findAll();
    }

    public Optional<Producto> obtenerPorId(Long id) {
        return productoRepositorio.findById(id);
    }

    public Producto crear(Producto producto) {
        return productoRepositorio.save(producto);
    }

    public Optional<Producto> actualizar(Long id, Producto datosNuevos) {
        return productoRepositorio.findById(id).map(producto -> {
            producto.setNombre(datosNuevos.getNombre());
            producto.setDescripcion(datosNuevos.getDescripcion());
            producto.setPrecio(datosNuevos.getPrecio());
            producto.setCategoria(datosNuevos.getCategoria());
            producto.setStock(datosNuevos.getStock());
            producto.setActivo(datosNuevos.getActivo());
            return productoRepositorio.save(producto);
        });
    }

    public boolean eliminar(Long id) {
        if (productoRepositorio.existsById(id)) {
            productoRepositorio.deleteById(id);
            return true;
        }
        return false;
    }
}

