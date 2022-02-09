var products = [];
$(".success").hide();
$(".error").hide();
$(".dsuccess").hide();
$(".usuccess").hide();
//function to add values
$('#add_product').click(function () {
    var sku = $('#product_sku').val();
    var name = $('#product_name').val();
    var price = $('#product_price').val();
    var quantity = $('#product_quantity').val();
    var go = checkVals(sku, name, price, quantity);
    var emp = checkEmpty(sku, name, price, quantity)
    if (go == true && emp == true) {
        if (products.find((x) => x.sku == sku)) {
            $(".success").hide();
            $(".error").show();
            $("#product_sku").css("border-color", "red");

            return;
        }
        else {
            products.push({
                Id: sku,
                Name: name,
                Price: price,
                Quantity: quantity
            });
            $(".error").hide();
            sMessage();
            display();
        }
    }

});
//function to display
function display() {

    var size = products.length;
    var k = '<tbody"><th style="padding-right:30px;">Product sku</th><th style="padding-right:30px;">Product Name </th><th style="padding-right:30px;">Product Price </th><th style="padding-right:30px;">Product Quantity </th>';
    for (let i = 0; i < size; i++) {
        k += '<tr>';
        k += '<td id="sku-' + products[i].Id + '">' + products[i].Id + '</td>';
        k += '<td id="name-' + products[i].Id + '">' + products[i].Name + '</td>';
        k += '<td id="price-' + products[i].Id + '">' + products[i].Price + '</td>';
        k += '<td id="quantity-' + products[i].Id + '" >' + products[i].Quantity + '</td>';
        k += '<td id="e-d' + products[i].Id + '"><a href="#" id="edit-' + products[i].Id + '" class="edit">Edit</a><a href="#" id="delete-' + products[i].Id + '"  class="delete">'+" "+'Delete </a></td>';
        k += '<td><a href="#" id="update-' + products[i].Id + '" class="update">'+" "+'update</a>' + '<a href="#" id="confirm-' + products[i].Id + '" class="confirm">'+" "+' confirm</a><a href="#" id="cancel-' + products[i].Id + '" class="cancel">'+" "+'cancel</a> ' + '</td>';
        k += '</tr>';
    }
    k += '</tbody>';

    $('#product_list').html(k);
    $(".update").hide();
    $(".confirm").hide();
    $(".cancel").hide();
}
//for edit/delete
$("#product_list").on("click", "a", function () {
    if (this.id.includes("delete")) {
        $(".confirm").show();
        $(".cancel").show();

        deleteRow(this.id.slice(7));
    }
    else if (this.id.includes("edit")) {
        console.log(this.id.slice(5));
        setEl(this.id.slice(5));
    }
});
function setEl(id) { 
    $(".success").hide();
    $(".update").show();
    var index = products.findIndex((x) => x.Id == id);
    $("#product_sku").val(products[index].sku);
    $("#product_name").val(products[index].name);
    $("#product_price").val(products[index].price);
    $("#product_quantity").val(products[index].quantity);
    editData(id);
}
function editData(id) {
    $("#update-" + id).click(function () {
        var sku = $("#product_sku").val();
        var name = $("#product_name").val();
        var price = $("#product_price").val();
        var quantity = $("#product_quantity").val();
        var index = products.findIndex((x) => x.Id == id);
        if (checkEmpty(sku, name, price, quantity)) {
            if (checkVals(sku, name, price, quantity)) {
                if (products.find((x) => x.sku == sku)) {
                    $(".success").hide();
                    $(".error").show();
                    $("#product_sku").css("border-color", "red");

                    return;
                }
                else {
                    products[index].Id = sku;
                    products[index].Name = name;
                    products[index].Price = price;
                    products[index].Quantity = quantity;
                    display(products);
                    $(".usuccess").show();
                    $(".confirm").hide();
                    $(".cancel").hide();
                }

            }
        }
    });
}
function deleteRow(id) {
    $(".success").hide();

    var c = "confirm-" + id;
    var index = products.findIndex(x => x.Id == id);
    $("#product_list").on("click", "a", function () {
        if (this.id == c) {

            products.splice(index, 1);
            display(products);
            $(".dsuccess").show();
            $(".confirm").hide();
            $(".cancel").hide();
        }


    });
}
function checkEmpty(sku, name, price, quantity) {
    if (sku && name && price && quantity) {
        return true;
    } else {
        $("input").css("border-color", "black");
        $(".success").hide();
        $(".error").show();
        if (!sku) {
            $("#product_sku").css("border-color", "red");
        }
        if (!name) {
            $("#product_name").css("border-color", "red");
        }
    }
    if (!price) {
        $("#product_price").css("border-color", "red");
    }
    if (!quantity) {
        $("#product_quantity").css("border-color", "red");
    }
    $(".close").click(function () {
        $(".error").hide();
    });
    return false;
}

function checkVals(sku, name, price, quantity) {
    if (isNaN(sku) || isNaN(price) || isNaN(quantity) || !isNaN(name)) {
        $("input").css("border-color", "black");
        $(".success").hide();
        $(".error").show();
        if (isNaN(sku)) {
            $("#product_sku").css("border-color", "red");
        }
        if (isNaN(price)) {
            $("#product_price").css("border-color", "red");
        }
        if (isNaN(quantity)) {
            $("#product_quantity").css("border-color", "red");
        }
        if (!isNaN(name)) {
            $("#product_name").css("border-color", "red");
        }
        $(".close").click(function () {
            $(".error").hide();
        });
        return false;
    } else {
        return true;
    }
}

function sMessage() {
    $(".success").show();
    $(".close").click(function () {
        $(".success").hide();
        $(".dsuccess").hide();
    });
}


