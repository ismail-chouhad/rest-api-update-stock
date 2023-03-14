<?php
/**
 * Plugin Name: Choc API
 * Description: Web service, get product stock quantity & status, update stock quantity.
 * version: 1.0.0.
 * author: Ismail CHOUHAD
 * Author URI: linkedin.com/in/ismail-chouhad/
 * 
 */

require __DIR__ . '\vendor\autoload.php';

use Automattic\WooCommerce\Client;

$woocommerce = new Client(
    'https://localhost/my-website',
    'ck_ee2ed572aa8cccca0e6a8463b0526146455f32c8',
    'cs_3014a3fd87028a4592cae23a57de30d7d01ec288',
    [
        'wp_api' => true,
        'version' => 'wc/v3',
    ]
);

add_action( 'woocommerce_update_product', 'on_product_savex', 10, 1 );
function on_product_savex( $product_id ) {
   $product = wc_get_product( $product_id );
   $product_sku = $product->get_sku();
   $remote_keys = "consumer_key=ck_ee2ed572aa8cccca0e6a8463b0526146455f32c8&consumer_secret=cs_3014a3fd87028a4592cae23a57de30d7d01ec288";

   // retrieve product ID by SKU, return product properties
   $remote_get = wp_remote_get("https://localhost/my-website/wp-json/wc/v3/products?sku={$product_sku}&{$remote_keys}");
   return json_decode($remote_get['body'])[0];
}

// add_action( 'woocommerce_update_product', 'on_product_savex', 10, 1 );
// function on_product_savex( $product_id ) {
//    $product = wc_get_product( $product_id );
//    $product_sku = $product->get_sku();
//    $remote_keys = "consumer_key=ck_ee2ed572aa8cccca0e6a8463b0526146455f32c8&consumer_secret=cs_3014a3fd87028a4592cae23a57de30d7d01ec288";

//    // retrieve product ID by SKU, return product properties
//    $remote_get = wp_remote_get("https://localhost/my-website/wp-json/wc/v3/products?sku={$product_sku}&{$remote_keys}");
//    $remote_product = json_decode($remote_get['body'])[0];
//    $remote_product_id = $remote_product->id;
   
//    $body = array(
//       'name' => $product->get_name(), // product title
//       'status' => 'private', // product status, default: publish
//       'regular_price' => $product->get_regular_price(),
//       'sale_price' => $product->get_sale_price(),
//       'description' => $product->get_description(),
//       'sku' => $product->get_sku(),
//       'weight' => $product->get_weight(),
//       'manage_stock' => true,
//       'stock_quantity' => 10,
//    );

//    $raw_response = wp_remote_post( "https://localhost/my-website/wp-json/wc/v3/products/1356?{$remote_keys}", 
//       array(
//          "headers" => array( "Content-Type" => "application/json" ),
//          "timeout" => 30,                    
//          "body" => json_encode( $body ),
//       )
//    );
// }

function products_stock(){
    // $args = [
    //     'post_type' => 'product',
    // ];
    // $products = wc_get_products($args);
    // $data = [];
    // $i = 0;

    // foreach($products as $product) {
    //     $data[$i]['id'] = wc_get_product_id_by_sku($product->sku);
    //     $data[$i]['sku'] = $product->sku;
    //     $data[$i]['stock_quantity'] = $product->stock_quantity;
    //     $data[$i]['stock_status'] = $product->stock_status;
    //     $i++;
    // }

    // return $data;

    return $woocommerce->get('products');
}

function product_by_sku($sku){
    $args = [
        'sku' => $sku['sku'],
        'post_type' => 'product',
    ];
    
    $product = wc_get_products($args);
    if(!$product){
        return new WP_Error( 'empty_data', 'Product Not Found', array( 'status' => 404 ));
    }

    $data['sku'] = $product[0]->sku;
    $data['stock_quantity'] = $product[0]->stock_quantity;
    $data['stock_status'] = $product[0]->stock_status;

    return $data;
}

function product_stock_update($sku){
    $args = [
        'sku' => $sku['sku'],
        'post_type' => 'product',
    ];
    
    $product = wc_get_products($args);
    if(!$product){
        return new WP_Error( 'empty_data', 'Product Not Found', array( 'status' => 404 ));
    }

    $data['sku'] = $product[0]->sku;
    $data['stock_quantity'] = 100;
    $data['stock_status'] = $product[0]->stock_status;

    return $data;
}

add_action('rest_api_init', function(){

    // register_rest_route('wc/v3', 'products', [
    //     'methods' => 'GET',
    //     // 'callback' => 'products_stock',
    //     ]);

    register_rest_route('choc/v1', 'products', [
        'methods' => 'GET',
        'callback' => 'products_stock',
        ]);

    register_rest_route('choc/v1', 'products/(?P<sku>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'product_by_sku',
    ));

    register_rest_route('choc/v1', 'products/update/(?P<sku>[a-zA-Z0-9-]+)', array(
        'methods' => 'PUT',
        'callback' => 'product_stock_update',
	));
});
