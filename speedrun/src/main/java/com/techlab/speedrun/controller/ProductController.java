package com.techlab.speedrun.controller;

import com.techlab.speedrun.entity.Product;
import com.techlab.speedrun.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product){
        return this.productService.createProduct(product);
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable Long id){

        return this.productService.getProductById(id);
    }

    @GetMapping("/products")
    public List<Product> getAllProducts(
            @RequestParam(required = false, defaultValue = "") String name,
            @RequestParam(required = false, defaultValue = "") String category)
    {
        return this.productService.findAllProducts(name, category);
    }

}
