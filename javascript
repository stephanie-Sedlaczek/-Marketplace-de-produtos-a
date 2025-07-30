// Dados mockados baseados no banco de dados fornecido
const categories = [
    { id: 1, name: "Cerâmica", description: "Peças em cerâmica artesanal", icon: "fa-bowl-food" },
    { id: 2, name: "Têxtil", description: "Roupas e acessórios feitos à mão", icon: "fa-tshirt" },
    { id: 3, name: "Madeira", description: "Objetos esculpidos em madeira", icon: "fa-tree" },
    { id: 4, name: "Metal", description: "Artefatos em metal trabalhado", icon: "fa-ring" },
    { id: 5, name: "Vidro", description: "Peças em vidro soprado", icon: "fa-wine-glass" }
];

const artisans = [
    { id: 1, name: "Maria da Silva", email: "maria@artes.com", rating: 4.8, image: "url('assets/images/artisan1.jpg')" },
    { id: 2, name: "João Oliveira", email: "joao@artes.com", rating: 4.5, image: "url('assets/images/artisan2.jpg')" },
    { id: 3, name: "Ana Santos", email: "ana@artes.com", rating: 5.0, image: "url('assets/images/artisan3.jpg')" },
    { id: 4, name: "Carlos Mendes", email: "carlos@artes.com", rating: 4.2, image: "url('assets/images/artisan4.jpg')" }
];

const products = [
    { 
        id: 1, 
        artisanId: 1, 
        name: "Vaso de Cerâmica", 
        description: "Vaso artesanal pintado à mão", 
        price: 89.90, 
        categoryId: 1,
        image: "url('assets/images/product1.jpg')"
    },
    { 
        id: 2, 
        artisanId: 2, 
        name: "Cesta de Palha", 
        description: "Cesta trançada manualmente", 
        price: 45.50, 
        categoryId: 3,
        image: "url('assets/images/product2.jpg')"
    },
    { 
        id: 3, 
        artisanId: 3, 
        name: "Colar de Prata", 
        description: "Colar feito com prata reciclada", 
        price: 120.00, 
        categoryId: 4,
        image: "url('assets/images/product3.jpg')"
    },
    { 
        id: 4, 
        artisanId: 4, 
        name: "Cobertor de Lã", 
        description: "Cobertor feito com lã natural", 
        price: 199.90, 
        categoryId: 2,
        image: "url('assets/images/product4.jpg')"
    },
    { 
        id: 5, 
        artisanId: 1, 
        name: "Conjunto de Xícaras", 
        description: "Xícaras de cerâmica esmaltada", 
        price: 75.00, 
        categoryId: 1,
        image: "url('assets/images/product5.jpg')"
    },
    { 
        id: 6, 
        artisanId: 3, 
        name: "Garrafa de Vidro", 
        description: "Garrafa de vidro soprado colorido", 
        price: 65.00, 
        categoryId: 5,
        image: "url('assets/images/product6.jpg')"
    }
];

// Função para carregar categorias
function loadCategories() {
    const categoryList = document.querySelector('.category-list');
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <i class="fas ${category.icon}"></i>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
        `;
        categoryList.appendChild(categoryCard);
    });
}

// Função para carregar produtos
function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    products.forEach(product => {
        const artisan = artisans.find(a => a.id === product.artisanId);
        const category = categories.find(c => c.id === product.categoryId);
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image" style="background-image: ${product.image};"></div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-artisan">Por: ${artisan.name}</p>
                <p class="product-category">${category.name}</p>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="btn btn-primary">Comprar</button>
                    <button class="btn btn-secondary"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Função para carregar artesãos
function loadArtisans() {
    const artisanGrid = document.querySelector('.artisan-grid');
    
    artisans.forEach(artisan => {
        const artisanCard = document.createElement('div');
        artisanCard.className = 'artisan-card';
        artisanCard.innerHTML = `
            <div class="artisan-avatar" style="background-image: ${artisan.image};"></div>
            <h3>${artisan.name}</h3>
            <div class="artisan-rating">
                ${'★'.repeat(Math.floor(artisan.rating))}${'☆'.repeat(5 - Math.floor(artisan.rating))}
                <span>(${artisan.rating})</span>
            </div>
            <button class="btn btn-primary">Ver produtos</button>
        `;
        artisanGrid.appendChild(artisanCard);
    });
}

// Função para inicializar a página
function init() {
    loadCategories();
    loadProducts();
    loadArtisans();
    
    // Adicionar evento de busca
    const searchButton = document.querySelector('.search-bar button');
    searchButton.addEventListener('click', performSearch);
    
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Função de busca
function performSearch() {
    const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
    
    if (searchTerm.trim() === '') return;
    
    // Filtrar produtos
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    
    // Limpar grade de produtos
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    
    // Mostrar resultados
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p class="no-results">Nenhum produto encontrado.</p>';
    } else {
        filteredProducts.forEach(product => {
            const artisan = artisans.find(a => a.id === product.artisanId);
            const category = categories.find(c => c.id === product.categoryId);
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image" style="background-image: ${product.image};"></div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-artisan">Por: ${artisan.name}</p>
                    <p class="product-category">${category.name}</p>
                    <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="btn btn-primary">Comprar</button>
                        <button class="btn btn-secondary"><i class="far fa-heart"></i></button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);
