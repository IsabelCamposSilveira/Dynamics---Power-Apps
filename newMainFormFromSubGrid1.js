// Botão na subGrid de prodecimento irá abrir o main form de Andamento com alguns campos preenchidos
function AbrirFormPreenchido(name, id) {

    debugger;

    var entityFormOptions = {};
    entityFormOptions["entityName"] = "smt_evento"; // Andamento

    // Pegar as variaveis enviadas pelo botão, Ribbon
    var procedimentoTable = name;
    var procedimentoId = id[0];

    var formParameters = {};

    // Busca o registo da entidade Procedimentos pelo ID
    Xrm.WebApi.retrieveRecord("smt_procedimento", procedimentoId, "?$select=_smt_faseprincipal_value, smt_tipo")
    .then(
        function success(result) {
            // 'result' contém os valores dos atributos solicitados
            var faseprincipalID = result._smt_faseprincipal_value;
            var nomeProcedimento = result.smt_tipo;

            // Preenche o campo procedimento da entidade andamento
            formParameters["smt_procedimento"] = procedimentoId; // ID do Procedimento.
            formParameters["smt_procedimentotype"] = procedimentoTable; // Table name. 
            formParameters["smt_procedimentoname"] = nomeProcedimento; // Name do Procedimento

            // Se o faseprincipalID tiver dados
            if(faseprincipalID !== null && faseprincipalID !== ""){
                // Busca o registo da entidade Fase pelo ID
                Xrm.WebApi.retrieveRecord("smt_fase", faseprincipalID, "?$select=smt_nome")
                .then(
                    function success(result) {
                        nomeFase = result.smt_nome;

                        // Preenche o campo fase da entidade andamento
                        formParameters["smt_faseprocedimento"] = faseprincipalID; 
                        formParameters["smt_faseprocedimentotype"] = "smt_fase"; 
                        formParameters["smt_faseprocedimentoname"] = nomeFase; 

                        // Abre o formulário 
                        Xrm.Navigation.openForm(entityFormOptions, formParameters).then(
                            function (success) {
                                console.log(success);
                            },
                            function (error) {
                                console.log(error);
                        });
                    },
                    function error(error) {
                        console.error("Erro na chamada da Web API: " + error.message);
                    }
                );
            } else{
                 // Abre o formulário 
                Xrm.Navigation.openForm(entityFormOptions, formParameters).then(
                    function (success) {
                        console.log(success);
                    },
                    function (error) {
                        console.log(error);
                });
            }
        },
        function error(error) {
            console.error("Erro na chamada da Web API: " + error.message);
        }
    );

}