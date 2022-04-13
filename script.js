let moneyInWallet = 0;
let moneyToPay = 0;

$(document).ready(function() {
    // MAHSULOTLAR NARXINI VA RASMINI TO'G'RI JOYLASHTIRIB CHIQISH KERAK
    $(".product").each(function() {
        // Narxni joylashtirish
        // Har bir mahsulot narxi o'zidagi data-product-price qiymatiga teng
        let productPrice = $(this).data("product-price");
        // Narx ko'rsatiluvchi span ichidagi matn data-product-pricedagi qiymatga teng
        $(this).find(".product_price").text(productPrice);

        // Rasmni joylashirish
        let productImage = $(this).data("product-image");
        $(this).find(".product_image").attr("src", productImage);
    });

    // HAMYONDAGI SUMMANI SAQLAB QO'YISH
    $("#save-wallet-money-btn").click(function(event){
        // Fomrning tabiiy ishlash prinsipini to'xtatish
        event.preventDefault();

        checkValidityOfMoneyInWallet();

        // summani global o'zgaruvchi saqlab olamiz
        moneyInWallet = $("#money-in-wallet-input").val();

        // pulni ko'rsatuvchi matn moneyInWalletdagi qiymatga teng bo'lsn
        $("#money-in-wallet-text").text(moneyInWallet);
    });

    // MAHSULOTNI TANLASH
    $(".product").click(function() {
        // Hamyonda pul bo'masa, tavarlarni tanlash mumkin emas
        if (moneyInWallet === 0) {
            alert("Hamyonda pul bo'lmasa, mahsulotlarni tanlash mumkin emas");
            return;
        }

        // Tavar narxini eslab qolamiz
        let productPrice = $(this).data("product-price");

        // Tavar tanlanmagan bo'lsagina tavar narxini jami chek sumasiga qo'shamiz
        if ($(this).hasClass("selected")) {
            moneyToPay -= productPrice;
        } else {
            moneyToPay += productPrice;
        }
        
        // Tanlangan tovarlar jami summasi hamyondagi summadan ortib ketsa, tovarni qo'shib bo'lmaydi
        $("#money-to-pay-text").text(moneyToPay);

        // Tanlangan tavarlar jami summasi hamyondagi summadan ortib ketsa, tovarni qo'shib bo'lmaydi
        if(!$(this).hasClass("selected") && moneyInWallet < moneyToPay) {
            alert("Tanlangan tavarlar jami summasi homyondagi summadan ortib ketdi.");
            // tanlay olinmagan tovarning narxini jami summadan olib tashlaymiz
            moneyToPay -= productPrice;
            // Aktual narxni ko'rsatish
            $("#money-to-pay-text").text(moneyToPay);

            return;
        }

        $(this).toggleClass("selected");
    });

    // SOTIB OLISH MANTIG'INI TUZAMIZ
    $("#buy-product-btn").click(function(event) {
        // Shakl yubarishining oldini olamiz
        event.preventDefault();

        checkValidityOfMoneyInWallet();

        // Agar mahsulot tanlanmagan bo'lsa, sotib olish imkoniyati ishlamaydi
        if ($(".selected").length === 0) {
            alert("Iltimos, sotib olish uchun biron tovarni tanlang");
            return;
        }

        // Chek summasi hamyondagi puldan olib qolinsin
        moneyInWallet -= moneyToPay;

        // Chek summasi yangilansin, ya'ni 0 ga tenglansin
        moneyToPay = 0;

        $("#money-in-wallet-text").text(moneyInWallet);
        $("#money-to-pay-text").text("0");

        $(".selected").removeClass("selected");
    });


    // YORDAMCHI FUNKSIYALAR 
    function checkValidityOfMoneyInWallet() {
        let moneyInWalletInput = $("#money-in-wallet-input");

        // summa maydoni bo'sh bo'lmasligi kerak
        if(moneyInWalletInput.val() === ""){
            alert("Bu maydonni bo'sh qoldirish mumkun emas.");
            return; 
        }

        // summa maydoni 0 dan katta bo'lishi kerak
        if(moneyInWalletInput.val() < 1){
            alert("Hammyondagi pul  summasi 0 dan katta bo'lishi kerak.");
            return; 
        }
    }
});    