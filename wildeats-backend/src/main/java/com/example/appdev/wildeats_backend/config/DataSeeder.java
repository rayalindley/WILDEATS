package com.example.appdev.wildeats_backend.config;

import com.example.appdev.wildeats_backend.model.MenuItem;
import com.example.appdev.wildeats_backend.model.Shop;
import com.example.appdev.wildeats_backend.model.User;
import com.example.appdev.wildeats_backend.repository.MenuItemRepository;
import com.example.appdev.wildeats_backend.repository.ShopRepository;
import com.example.appdev.wildeats_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ShopRepository shopRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Only seed if shops table is empty
        if (shopRepository.count() > 0) return;

        System.out.println("🌱 Seeding database with shops and menu items...");

        // ==================== SHOPS ====================
        Shop s1 = shopRepository.save(Shop.builder()
                .name("The Canteen").cuisine("Rice Meals · All-Day")
                .description("Your go-to for hearty Filipino comfort food. Hot meals served fresh every day.")
                .emoji("🍱").rating(4.8).reviewCount(312).deliveryTime("10–15 min")
                .isOpen(true).tag("Best Seller").priceRange("₱40–₱120")
                .category("Rice Meals").location("Building A, Ground Floor").build());

        Shop s2 = shopRepository.save(Shop.builder()
                .name("Munchies Corner").cuisine("Snacks · Kakanin · Drinks")
                .description("Affordable snacks and local sweets perfect for those in-between class cravings.")
                .emoji("🧁").rating(4.7).reviewCount(198).deliveryTime("5–10 min")
                .isOpen(true).tag("Student Fave").priceRange("₱15–₱60")
                .category("Snacks").location("Building B, Lobby").build());

        Shop s3 = shopRepository.save(Shop.builder()
                .name("Brew & Bites").cuisine("Coffee · Sandwiches · Pastries")
                .description("Artisan coffee and fresh sandwiches to power through your study sessions.")
                .emoji("☕").rating(4.9).reviewCount(445).deliveryTime("8–12 min")
                .isOpen(true).tag("Top Rated").priceRange("₱35–₱120")
                .category("Café").location("Library Building, G/F").build());

        Shop s4 = shopRepository.save(Shop.builder()
                .name("Grill House").cuisine("BBQ · Isaw · Ihaw-Ihaw")
                .description("Classic Filipino street grill favorites. Perfectly charred, always satisfying.")
                .emoji("🍢").rating(4.6).reviewCount(267).deliveryTime("15–20 min")
                .isOpen(true).tag("Open Late").priceRange("₱10–₱80")
                .category("Grill").location("Back Court Area").build());

        Shop s5 = shopRepository.save(Shop.builder()
                .name("Noodle Bar").cuisine("Mami · Pansit · Lugaw")
                .description("Warm noodle soups and stir-fries that hit different on a long school day.")
                .emoji("🍜").rating(4.5).reviewCount(153).deliveryTime("10–18 min")
                .isOpen(false).tag("Opens 10AM").priceRange("₱35–₱95")
                .category("Noodles").location("Covered Court, Stall 3").build());

        Shop s6 = shopRepository.save(Shop.builder()
                .name("Sip & Chill").cuisine("Milk Tea · Fruit Shakes · Soda")
                .description("Cold drinks for hot days. Build your own milk tea or grab a fresh shake.")
                .emoji("🧋").rating(4.7).reviewCount(389).deliveryTime("5–10 min")
                .isOpen(true).tag("Fan Favorite").priceRange("₱30–₱85")
                .category("Drinks").location("Building C, G/F").build());

        // ==================== MENU ITEMS ====================
        // Shop 1 - The Canteen
        menuItemRepository.save(MenuItem.builder().name("Chicken Adobo").price(120.0).image("/assets/adobo.jpg").description("Tender chicken slow-cooked in soy sauce, vinegar, garlic, and bay leaves.").emoji("🍗").shopId(s1.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Pork Sinigang").price(135.0).image("/assets/sinigang.jpg").description("Rich and sour pork soup with fresh vegetables and tamarind broth.").emoji("🍲").shopId(s1.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Fried Chicken").price(110.0).image("/assets/fried-chicken.jpg").description("Crispy golden fried chicken seasoned to perfection. Best paired with rice.").emoji("🍗").shopId(s1.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Beef Steak").price(145.0).image("/assets/beefsteak.jpg").description("Juicy beef steak marinated in calamansi and soy sauce, topped with caramelized onions.").emoji("🥩").shopId(s1.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Vegetable Stir Fry").price(95.0).image("/assets/veggies.jpg").description("Fresh mixed vegetables stir-fried in garlic and oyster sauce.").emoji("🥦").shopId(s1.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Rice").price(20.0).image("/assets/rice.jpg").description("Steaming white rice — the perfect companion to any viand.").emoji("🍚").shopId(s1.getId()).build());

        // Shop 2 - Munchies Corner
        menuItemRepository.save(MenuItem.builder().name("Maja Blanca").price(100.0).image("/assets/maja-blanca.jpg").description("Creamy coconut milk pudding topped with toasted coconut.").emoji("🍮").shopId(s2.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Cassava Cake").price(140.0).image("/assets/cassava-cake.jpg").description("Soft and chewy cassava cake with a golden custard topping.").emoji("🍰").shopId(s2.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Puto Bumbong").price(150.0).image("/assets/puto-bumbong.jpg").description("Sticky purple rice cake served with butter and grated coconut.").emoji("🍡").shopId(s2.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Banana Cue").price(120.0).image("/assets/banana-cue.jpg").description("Deep-fried caramelized bananas on a stick. Sweet and crunchy.").emoji("🍌").shopId(s2.getId()).build());

        // Shop 3 - Brew & Bites
        menuItemRepository.save(MenuItem.builder().name("Classic Milk Tea").price(100.0).image("/assets/milktea.jpg").description("Smooth and creamy classic milk tea with your choice of toppings.").emoji("🧋").shopId(s3.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Taro Milk Tea").price(110.0).image("/assets/taro.jpg").description("Taro-flavored milk tea with a sweet, nutty taste.").emoji("🧋").shopId(s3.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Iced Coffee").price(90.0).image("/assets/iced-coffee.jpg").description("Chilled brewed coffee sweetened to your taste.").emoji("☕").shopId(s3.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Hot Latte").price(105.0).image("/assets/latte.jpg").description("Warm espresso with steamed milk. Rich and comforting.").emoji("☕").shopId(s3.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Chocolate Frappe").price(120.0).image("/assets/frappe.jpg").description("Blended chocolate frappe — thick, creamy, and indulgent.").emoji("🥤").shopId(s3.getId()).build());

        // Shop 4 - Grill House
        menuItemRepository.save(MenuItem.builder().name("Pork BBQ").price(80.0).image("/assets/pork-bbq.jpg").description("Sweet and smoky pork barbecue on a stick, chargrilled to perfection.").emoji("🍖").shopId(s4.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Chicken Inasal").price(110.0).image("/assets/chicken-inasal.jpg").description("Inasal-style grilled chicken marinated in lemongrass and annatto.").emoji("🍗").shopId(s4.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Grilled Cheeseburger").price(65.0).image("/assets/grilled-cheeseburger.jpg").description("Grilled beef patty with melted cheese on a toasted bun.").emoji("🍔").shopId(s4.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Tuna Belly Steak").price(50.0).image("/assets/tuna-belly-steak.jpg").description("Grilled tuna belly steak seasoned with garlic and herbs.").emoji("🐟").shopId(s4.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Beef Tapa").price(45.0).image("/assets/beef-tapa.jpg").description("Sweet cured beef tapa — great for any time of day.").emoji("🥩").shopId(s4.getId()).build());

        // Shop 5 - Noodle Bar
        menuItemRepository.save(MenuItem.builder().name("Fish Balls").price(50.0).image("/assets/fishballs.jpg").description("Classic street-style fish balls with sweet or spicy sauce.").emoji("🐟").shopId(s5.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Kwek-Kwek").price(60.0).image("/assets/kwekkwek.jpg").description("Orange-coated hard-boiled quail eggs, deep-fried with dipping sauce.").emoji("🥚").shopId(s5.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Squid Balls").price(60.0).image("/assets/squidballs.jpg").description("Chewy squid balls skewered on a stick with your choice of sauce.").emoji("🦑").shopId(s5.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Banana Cue").price(40.0).image("/assets/banana-cue.jpg").description("Caramelized fried bananas on a stick. Sweet and crispy.").emoji("🍌").shopId(s5.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Turon").price(45.0).image("/assets/turon.jpg").description("Crispy banana spring rolls with langka filling.").emoji("🌯").shopId(s5.getId()).build());

        // Shop 6 - Sip & Chill
        menuItemRepository.save(MenuItem.builder().name("Wintermelon Milk Tea").price(80.0).image("/assets/wintermelon-milk-tea.jpg").description("Refreshing wintermelon-flavored milk tea with subtle sweetness.").emoji("🧋").shopId(s6.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Matcha Milk Tea").price(140.0).image("/assets/matcha-milk-tea.jpg").description("Premium matcha milk tea with a rich, earthy flavor.").emoji("🍵").shopId(s6.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Hokkaido Milk Tea").price(120.0).image("/assets/hokkaido-milk-tea.jpg").description("Creamy Hokkaido-style milk tea with a smooth caramel finish.").emoji("🧋").shopId(s6.getId()).build());
        menuItemRepository.save(MenuItem.builder().name("Strawberry Matcha Latte").price(110.0).image("/assets/strawberry-matcha-latte.jpg").description("A trendy blend of strawberry and matcha latte.").emoji("🍓").shopId(s6.getId()).build());

        System.out.println("✅ Seeded " + shopRepository.count() + " shops and " + menuItemRepository.count() + " menu items.");

        // ==================== ADMIN USER ====================
        if (!userRepository.existsByEmail("admin@wildeats.com")) {
            User admin = new User();
            admin.setEmail("admin@wildeats.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFirstName("Admin");
            admin.setLastName("WildEats");
            admin.setRole(User.Role.ADMIN);
            admin.setEnabled(true);
            userRepository.save(admin);
            System.out.println("✅ Created admin user: admin@wildeats.com / admin123");
        }
    }
}
