
$(function () {

    return false;

    function buscaClientes() {
        $.ajax({
            url: "/manutencao/buscaClientes",
        }).done(function (result) {
            $('#manut_cli_select, #manut_modal_cli_select').html('<option value="0">Selecione...</option>');

            $(result).each(function (i, cada) {
                $('#manut_cli_select, #manut_modal_cli_select').append('<option value="' + cada.id + '">' + cada.nome_razao + '</option>');
            })
        });

//        limpaCampos();
    }
    
    function buscaOrdensServico(cliente_id){
        $.ajax({
            url: "/manutencao/buscaOrdensServico",
            data: {cliente_id: cliente_id}
        }).done(function (result) {
            $('#manut_tab_os tbody').html('');
            
            $(result).each(function (i, cada){
                $('#manut_tab_os tbody').append('<tr data-id="'+cada.id+'"><td>'+cada.id+'</td><td>'+cada.ordemservico+'</td><td>'+cada.placa+'</td><td>'+cada.descricao+'</td><td data-tipo=date>'+cada.dtainclusao+'</td><td><a href="/manutencao/exibe-os/'+cada.id+'" target="_blank" class="btn btn-default" name="print"><i class="fa fa-print"></i></a></td><td><a href="#" target="_blank" class="btn btn-default" name="edit"><i class="fa fa-edit"></i></a></td></tr>');
            })
            
            $('#manut_tab_os').formatacao().tabela();
        });
    }
    
    function buscaProdutos() {
        $.ajax({
            url: "/manutencao/buscaProdutos",
        }).done(function (result) {
            $("#manut_prod").autocomplete({
                source: result,
                minLength: 1,
                select: function( event, ui ) {
                    $('#manut_prod_qtd').focus();
                }
            });
            
            $("#manut_modal_prod").autocomplete({
                source: result,
                minLength: 1,
                select: function( event, ui ) {
                    $('#manut_modal_prod_qtd').focus();
                }
            });
            
        });
    }

    function limpaCampos() {
        return ;
        $('#manut_form').find('.form-control').each(function () {
            if (this.tagName == 'SELECT') {
                this.value = $(this).find('option:first').val();
            } else {
                $(this).val('');
            }
            
        });
    }

    function salvar(id, cliente_id, veic_id, descricao, precomaodeobra, percdescmaodeobra, precomaodeobratotal, formapagto, produtos) {
        
        $.ajax({
            url: "/manutencao/salvar",
            data: {
                id:id,
                cliente_id:cliente_id,
                veiculo_id:veic_id,
                descricao:descricao,
                precomaodeobra:precomaodeobra,
                percdescmaodeobra:percdescmaodeobra,
                precomaodeobratotal:precomaodeobratotal,
                formapagto:formapagto,
                produtos:produtos,
            }
        }).done(function (result) {

            var div_alertas = (id > 0) ? '#manut_modal_alertas' : '#manut_alertas';
            if (result.hasOwnProperty('error')) {
                $(div_alertas).showMessageTarge({type: 'warning'});
                return false;
            }

            $('#manut_modal_manut').modal('hide');
            $('#manut_alertas').showMessageTarge({type: 'success'});

            buscaOrdensServico(cliente_id);
            buscaProdutos();
//            limpaCampos();
        });
    }

    $('#manut_desfazer').click(function () {
        limpaCampos();
    });

    $('#manut_form').submit(function () {

        if (!tudo_ok) {
            $('#manut_alertas').showMessageTarge({
                message: 'Verifique os campos obrigatórios.',
                type: 'warning'
            });
            return false;
        }
        
        var cliente_id=$('#manut_cli_select').val();
        var veic_id=$('#manut_veic_select').val();
        var descricao=$('#manut_descricao').val();
        var precomaodeobra=$('#manut_mao_obra').val();
        var percdescmaodeobra=$('#manut_mao_obra_perc_desc').val();
        var precomaodeobratotal=$('#manut_mao_obra_total').val();
        var formapagto=$('#manut_form input[name=formapagto]:checked').val();
        
        var produtos=[];
        $('#manut_tab_produtos tbody tr').each(function (i, cada){
            var produto = {};
            produto = {
                produto_id: $(this).find('td[name=id]').html(),
                quantidade: $(this).find('td[name=quantidade]').html()
            }
            
            produtos.push(produto)
        });

        salvar(null, cliente_id, veic_id, descricao, precomaodeobra, percdescmaodeobra, precomaodeobratotal, formapagto, produtos);

        return false;
    });

    $('.btn-app[data-title=Manutencao]').click(function () {
        buscaClientes();
        buscaProdutos();
    });

});
