// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/api/products")
// @CrossOrigin(origins = "*")
// public class ShopController {

//     @Autowired
//     private ProductRepository productRepository;

//     @GetMapping
//     public List<Product> getAllProducts() {
//         return productRepository.findAll();
//     }
// }