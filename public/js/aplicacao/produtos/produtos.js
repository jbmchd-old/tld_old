
$(function () {
    
    function buscaFornecedores() {
        $.ajax({
            url: "/produtos/buscaFornecedores",
        }).done(function (result) {
            $('#prod_forn_select').html('<option value="0">Selecione...</option>');

            $(result).each(function (i, cada) {
                $('#prod_forn_select').append('<option value="' + cada.id + '">' + cada.nome_razao + '</option>');
            })
        });

        limpaCampos();
    }

    function buscaVeiculosMarcas() {
        
        $.ajax({
            url: "/produtos/buscaVeiculosMarcas",
        }).done(function (result) {
            
            $('#prod_veic_marca_select, #modal_prod_veic_select').html('<option value="0">Selecione...</option>');

            $(result).each(function (i, cada) {
                $('#prod_veic_marca_select, #modal_prod_veic_select').append('<option value="' + cada.id + '">' + cada.nome + '</option>');
            });
        });

    }

    function buscaMarcas(fornecedor_id) {
        $.ajax({
            url: "/produtos/buscaMarcas",
            data: {fornecedor_id: fornecedor_id}
        }).done(function (result) {
            $('#prod_marca_select, #modal_prod_marca_select').html('<option value="0">Selecione...</option>');

            $(result).each(function (i, cada) {
                $('#prod_marca_select, #modal_prod_marca_select').append('<option value="' + cada.id + '">' + cada.nome + '</option>');
            })
        });
    }
    
    function buscaProdutos() {
        
        var fornecedor_id = $('#prod_forn_select').val();
        
        $.ajax({
            url: "/produtos/buscaProdutos",
            data: {fornecedor_id: fornecedor_id}
        }).done(function (result) {
            
            var table = $('#prod_tabela tbody');
            table.html('');
            $(result).each(function (i, cada) {
                table
                    .append('<tr data-id="'+cada.id+'" data-marca_id="'+cada.marca_id+'" data-veic_marca_id="'+cada.veic_marca_id+'"><td>'+cada.id+'</td><td>'+cada.marca+'</td><td>'+cada.veic_marca+'</td><td>'+cada.categoria+'</td><td>'+cada.descricao+'</td><td>'+cada.quantidade+'</td><td>'+cada.unidade+'</td><td>'+cada.espessura+'</td><td data-tipo="currency">'+cada.precocusto+'</td><td data-tipo="currency">'+cada.precovenda+'</td><td>'+cada.status+'</td><td>'+cada.obs+'</td><td style="text-align:center"><button type="button"><i class="fa fa-edit"></i></button></td></tr>');
            })
            
            $('.table').formatacao().tabela();
        });
    }
    
    function limpaCampos() {
        $('#prod_form').find('.form-control').each(function () {
            if (this.tagName == 'SELECT') {
                if(this.id != 'prod_forn_select'){ this.value = $(this).find('option:first').val(); }
            } else {
                $(this).val('');
            }
            $('#prod_status').prop('checked', true);
        });
    }

    function salvar(id,marca_id,veic_marca_id,categoria,descricao,quantidade,unidade,espessura,precocusto,precovenda,obs,status) {
        $.ajax({
            url: "/produtos/salvar",
            data: {
                id: id,
                marca_id: marca_id,
                veic_marca_id: veic_marca_id,
                categoria: categoria,
                descricao: descricao,
                quantidade: quantidade,
                unidade: unidade,
                espessura: espessura,
                precocusto: precocusto,
                precovenda: precovenda,
                obs: obs,
                status: status,
            }
        }).done(function (result) {
            
            var div_alertas = (id > 0) ? '#prod_modal_alertas' : '#prod_alertas';
            if (result.hasOwnProperty('error')) {
                $(div_alertas).showMessageTarge({type: 'warning'});
                return false;
            }

            $('#prod_modal_prod').modal('hide');
            $('#prod_alertas').showMessageTarge({type: 'success'});

            buscaProdutos();
            limpaCampos();
        });
    }
    
    $('#prod_forn_select').change(function (){
        var id = $(this).val();
        if (id > 0) {
            buscaMarcas(id);
            buscaProdutos();
        } else {
            limpaCampos();
            $('#prod_tabela tbody').html('');
        }
    });

    $('#prod_desfazer').click(function (){ limpaCampos(); });
    
    $('#prod_form').submit(function () {

        if (!tudo_ok) {
            $('#prod_alertas').showMessageTarge({
                message: 'Verifique os campos obrigatórios.',
                type: 'warning'
            });
            return false;
        }
        
        var marca_id=$('#prod_marca_select').val();
        var veic_marca_id = $('#prod_veic_marca_select').val();
        var categoria = $('#prod_categoria').val();
        var descricao = $('#prod_descricao').val();
        var quantidade = $('#prod_quantidade').val();
        var unidade = $('#prod_unidade').val();
        var espessura = $('#prod_espessura').val();
        var precocusto = $('#prod_precocusto').val();
        var precovenda = $('#prod_precovenda').val();
        var obs = $('#prod_obs').val();
        var status = ($('#prod_status').prop('checked')==true)?'A':'I';
        
        salvar(null,marca_id,veic_marca_id,categoria,descricao,quantidade,unidade,espessura,precocusto,precovenda,obs,status);

        return false;
    });
    
    $('#prod_tabela').on('click', 'button', function () {
        
        var tds = $(this).parents('tr').children();

        var id = $(this).parents('tr').attr('data-id');
        var marca_id = $(this).parents('tr').attr('data-marca_id');
        var veic_marca_id = $(this).parents('tr').attr('data-veic_marca_id');
        
        var categoria = tds.filter(':nth-child(4)').html();
        var descricao = tds.filter(':nth-child(5)').html();
        var quantidade = tds.filter(':nth-child(6)').html();
        var unidade = tds.filter(':nth-child(7)').html();
        var espessura = tds.filter(':nth-child(8)').html();
        var precocusto = tds.filter(':nth-child(9)').html();
        var precovenda = tds.filter(':nth-child(10)').html();
        var status = tds.filter(':nth-child(11)').html();
        var obs = tds.filter(':nth-child(12)').html();

        $('#modal_prod_id').val(id);
        $('#modal_prod_marca_select').val(marca_id);
        $('#modal_prod_veic_select').val(veic_marca_id);
        $('#modal_prod_categoria').val(categoria);
        $('#modal_prod_descricao').val(descricao);
        $('#modal_prod_quantidade').val(quantidade);
        $('#modal_prod_unidade').val(unidade);
        $('#modal_prod_espessura').val(espessura);
        $('#modal_prod_precocusto').val(precocusto);
        $('#modal_prod_precovenda').val(precovenda);
        $('#modal_prod_obs').val(obs);
        $('#modal_prod_status').prop('checked',(status=='A')?true:false);

        $form().atrelaEventosPorAtributos( $('#prod_modal_form').find( campos_texto.join() ) );

        $('#prod_modal_prod').modal();
    });
    
    $('#prod_modal_form').submit(function () {
        
        if (!tudo_ok) {
            $('#prod_modal_alertas').showMessageTarge({
                message: 'Verifique os campos obrigatórios.',
                type: 'warning'
            });
            return false;
        }

        var id=$('#modal_prod_id').val();
        var marca_id=$('#modal_prod_marca_select').val();
        var veic_marca_id = $('#modal_prod_veic_select').val();
        var categoria = $('#modal_prod_categoria').val();
        var descricao = $('#modal_prod_descricao').val();
        var quantidade = $('#modal_prod_quantidade').val();
        var unidade = $('#modal_prod_unidade').val();
        var espessura = $('#modal_prod_espessura').val();
        var precocusto = $('#modal_prod_precocusto').val();
        var precovenda = $('#modal_prod_precovenda').val();
        var obs = $('#modal_prod_obs').val();
        var status = ($('#modal_prod_status').prop('checked')==true)?'A':'I';
        
        salvar(id,marca_id,veic_marca_id,categoria,descricao,quantidade,unidade,espessura,precocusto,precovenda,obs,status);
        
        return false;

    });

    $('a.open-app[data-title=Produtos]').click(function () {
        buscaFornecedores();
        buscaVeiculosMarcas();
        limpaCampos();
    });
    
});
