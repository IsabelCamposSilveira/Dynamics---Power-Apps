function OnChangeTelefone(executionContext) {
    const formContext = executionContext.getFormContext();
    var telefone = formContext.getAttribute("telephone1").getValue();
    var code = "TELEFONE_FAIL";

    if (telefone != null){
        // Retira todos os caracteres que não são números
        var telefoneNumeros = telefone.replace(/\-/g,"").replace(/\(/g,"").replace(/\)/g,"").replace(/\ /g,"");

        if (telefoneNumeros.length == 10){
            // Formata número de telefone com 8 dí­gitos
            var telefoneFormatado = "(" + telefoneNumeros.slice(0,2) + ") " + telefoneNumeros.slice(2,6) + "-" + telefoneNumeros.slice(6);
            formContext.getAttribute("telephone1").setValue(telefoneFormatado);
            formContext.getControl("telephone1").clearNotification(code);
        }else if (telefoneNumeros.length == 11){
            // Formata número de telefone com 9 dí­gitos
            var telefoneFormatado = "(" + telefoneNumeros.slice(0,2) + ") " + telefoneNumeros.slice(2,7) + "-" + telefoneNumeros.slice(7);
            formContext.getAttribute("telephone1").setValue(telefoneFormatado);
            formContext.getControl("telephone1").clearNotification(code);
        }else{
            formContext.getControl("telephone1").setNotification("Número Inválido. O formato deve ser (00) 0000-0000 ou (00) 00000-0000.", code);
        }
    } else {
        formContext.getControl("telephone1").clearNotification(code);
    }
}