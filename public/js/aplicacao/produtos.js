
$(function () {
    
// INICIO - REFERENTE AO MODAL DE GERENCIAR MARCAS DE PRODUTOS 

    function buscaTodasMarcas() {
        $.ajax({
            url: "/produtos/buscaTodasMarcas",
        }).done(function (result) {
            $('#prod_modal_marca_select').html('<option data-status="A" value="0">Nova...</option>');
            $(result).each(function (i, cada) {
                $('#prod_modal_marca_select').append('<option data-status="' + cada.status + '" value="' + cada.id + '">' + cada.nome + '</option>');
            })
            
        });
    }

    $('#prod_modal_marca_select').change(function (){
        
        var id = $('#prod_modal_marca_select option:selected').val();
        var nome = $('#prod_modal_marca_select option:selected').html();
        var status  = $('#prod_modal_marca_select option:selected').attr('data-status');

        $('#modal_prod_marca_nome').val((id>0)?nome:'');
        $('#modal_prod_marca_status').prop('checked',(status=='A')?true:false)
    });

    $('#prod_modal_marca_form').submit(function (){
        
        if (!tudo_ok) {
            $('#prod_modal_marca_alertas').showMessageTarge({
                message: 'Informe um nome',
                type: 'warning'
            });
            return false;
        }
        
        var id = $('#prod_modal_marca_select option:selected').val();
        var nome = $('#modal_prod_marca_nome').val();
        var status  = ($('#modal_prod_marca_status').is(':checked'))?'A':'I';
        
        $.ajax({
            url:'/produtos/salvarMarca',
            data:{
                id: id,
                nome: nome,
                status: status,
            }
        }).done(function (result){

            if (result.hasOwnProperty('error')) {
                $('#prod_modal_marca_alertas').showMessageTarge({type: 'warning'});
                return false;
            }
            
            $('#prod_modal_marca').modal('hide');
            $('#prod_alertas').showMessageTarge({type: 'success'});
            
            $('#prod_tabela tbody').html('');
            buscaMarcas();
        });   
        
        return false;
    });

    $('#prod_add_marca').click(function (){
        $('#prod_modal_marca_select').val(0);
        $('#modal_prod_marca_nome').val('');
        $('#modal_prod_marca_status').prop('checked', true)
        
        buscaTodasMarcas();
        $('#prod_modal_marca').modal();
    });
    
// FIM - REFERENTE AO MODAL DE GERENCIAR MARCAS DE PRODUTOS     

// INICIO - REFERENTE TELA PRINCIPAL

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

    function buscaMarcas() {
        $.ajax({
            url: "/produtos/buscaMarcas",
        }).done(function (result) {
            $('#prod_marca_select, #modal_prod_marca_select').html('<option value="0">Selecione...</option>');

            $(result).each(function (i, cada) {
                $('#prod_marca_select, #modal_prod_marca_select').append('<option value="' + cada.id + '">' + cada.nome + '</option>');
            })
        });
    }
    
    function buscaProdutos(marca_id) {
        $.ajax({
            url: "/produtos/buscaProdutos",
            data: {marca_id: marca_id}
        }).done(function (result) {
            var table = $('#prod_tabela tbody');
            table.html('');
            $(result).each(function (i, cada) {
                table
                    .append('<tr data-id="'+cada.id+'" data-marca_id="'+cada.marca_id+'" data-veic_marca_id="'+cada.veic_marca_id+'"><td>'+cada.veic_marca+'</td><td>'+cada.categoria+'</td><td>'+cada.descricao+'</td><td>'+cada.quantidade+'</td><td>'+cada.unidade+'</td><td>'+cada.espessura+'</td><td>'+cada.precocusto+'</td><td>'+cada.precovenda+'</td><td>'+cada.status+'</td><td>'+cada.obs+'</td><td style="text-align:center"><button type="button"><i class="fa fa-edit"></i></button></td></tr>');
            })
        });
    }
    
    function limpaCampos() {
        $('#prod_form').find('.form-control').each(function () {
            if (this.tagName == 'SELECT') {
                if(this.id != 'prod_marca_select'){ this.value = $(this).find('option:first').val(); }
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

            buscaProdutos(marca_id);
            limpaCampos();
        });
    }

    $('#prod_marca_select').change(function () {
        var id = $(this).val();
        if (id > 0) {
            buscaProdutos(id);
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
        
        var categoria = tds.filter(':nth-child(2)').html();
        var descricao = tds.filter(':nth-child(3)').html();
        var quantidade = tds.filter(':nth-child(4)').html();
        var unidade = tds.filter(':nth-child(5)').html();
        var espessura = tds.filter(':nth-child(6)').html();
        var precocusto = tds.filter(':nth-child(7)').html();
        var precovenda = tds.filter(':nth-child(8)').html();
        var status = tds.filter(':nth-child(9)').html();
        var obs = tds.filter(':nth-child(10)').html();

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

        $('#prod_modal_prod').modal();
    });
    
// FIM - REFERENTE TELA PRINCIPAL    

// INICIO - REFERENTE AO MODAL DE ALTERAR PRODUTOS

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
        buscaMarcas();
        buscaVeiculosMarcas();
        limpaCampos();
    });
    
// FIM - REFERENTE AO MODAL DE ALTERAR PRODUTOS
});
