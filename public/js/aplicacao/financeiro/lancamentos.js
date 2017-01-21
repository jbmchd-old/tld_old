
$(function () {

    /*CAMPOS DE DATA - INICIO*/
    $("#finan_lanc_dtavencimento, #finan_lanc_dtapagamento, #finan_lanc_pesq_inicio, #finan_lanc_pesq_fim, #finan_lanc_modal_dtavencimento, #finan_lanc_modal_dtapagamento").datepicker({
        changeMonth: true,
        changeYear: true,
    });
    $("#finan_lanc_dtavencimento, #finan_lanc_dtapagamento" ).datepicker( "setDate", "0" );
    $("#finan_lanc_pesq_inicio" ).datepicker( "setDate", "-32" );
    $("#finan_lanc_pesq_fim" ).datepicker( "setDate", "-1" );
    /*CAMPOS DE DATA - FIM*/

    /*SOBRE AS CATEGORIAS - INICIO*/
    
    function buscaTodasCategorias(){
        $.ajax({
            url: '/finan/lancamentos/buscaTodasCategorias',
        }).done(function (result) {
            $('#finan_lanc_modal_cat_id').html('<option value="0">Nova...</option>');
            
            $(result).each(function (i, cada){
                $('#finan_lanc_modal_cat_id').append('<option data-status="'+cada.status+'" value="'+cada.id+'">'+cada.nome+'</option>');
            });
            
        });
    }
    
    $('#finan_lanc_modal_cat_id').on('change',function(){
        var nome = $(this).find('option:selected').html();
        var status = $(this).find('option:selected').attr('data-status');
        
        if($(this).val() > 0){
            $('#finan_lanc_modal_cat_nome').val(nome)
            $('#finan_lanc_modal_cat_status').prop('checked',(status=='A')?true:false);
        } else {
            $('#finan_lanc_modal_cat_nome').val('')
            $('#finan_lanc_modal_cat_status').prop('checked',true);
        }
        
    })
    
    $('#finan_lanc_addcat').click(function () {
        buscaTodasCategorias();
        $('#finan_lanc_modal_categoria').modal();
    });

    $('#finan_lanc_modal_cat_form').submit(function () {

        var nome = $(this).find('[name=nome]').val();

        if (nome.length < 1) {
            $('#finan_lanc_modal_cat_alertas').showMessageTarge({type: 'warning', message: 'O nome é obrigatório'})
            return false;
        }

        var id = $(this).find('[name=id]').val();
        var status = $(this).find('[name=status]').prop('checked') ? 'A' : 'I' ;
        
        $.ajax({
            url: '/finan/lancamentos/salvarCategoria',
            data: {
                id: (id>0)?id:null,
                nome: nome,
                status: status
            }
        }).done(function (result) {
            
            if( ! result.ok){
                $('#finan_lanc_modal_cat_alertas').showMessageTarge({type: 'danger', message: 'Ocorreu algum problema, verifique!'})
                return false;
            }
            
            $('#finan_lanc_alertas').showMessageTarge({type: 'success', message: 'Categoria cadastrada'})
            
            $('#finan_lanc_modal_categoria').modal('hide');
            
            $('#finan_lanc_modal_cat_nome').val('');
            $('#finan_lanc_modal_cat_status').prop('checked',true);
        });

        buscaCategorias();
        return false;
    });

    /*SOBRE AS CATEGORIAS - FIM*/

    /*SOBRE OS LANÇAMENTOS - INICIO*/
    
    function buscaCategorias(){
        $.ajax({
            url: '/finan/lancamentos/buscaCategorias',
        }).done(function (result) {
            
            $(result).each(function (i, cada){
                $('#finan_lanc_cat, #finan_lanc_modal_cat').append('<option value="'+cada.id+'">'+cada.nome+'</option>');
            });
            
        });
    }

    $('#finan_lanc_situacao').change(function (){
        
        if($(this).prop('checked')){
            $('#finan_lanc_dtapagamento').parents('.finan_lanc_dtapagamento').removeClass('hide');
        } else {
            $('#finan_lanc_dtapagamento').parents('.finan_lanc_dtapagamento').addClass('hide');
            $('#finan_lanc_dtapagamento').val(null);
        }
    });

    $('#finan_lanc_form').submit(function (){
        
        var descricao = $('#finan_lanc_descricao').val();
        var valor = $('#finan_lanc_valor').val();
        
        if(descricao.trim().length < 1 || valor.trim().length < 1){
            $('#finan_lanc_alertas').showMessageTarge({type: 'warning', message: 'Verifique os campos obrigatórios.'})
            return false;   
        }
        
        var id = null;
        var categoria = $('#finan_lanc_cat').val();
        var tipo = $('#finan_lanc_tipo :radio:checked').val();
        var dtavencimento = $('#finan_lanc_dtavencimento').val().split('/').reverse().join('-');
        var valor = $('#finan_lanc_valor').val();
        var situacao = $('#finan_lanc_situacao').prop('checked')?'P':'A';
        var dtapagamento = situacao=='P'?$('#finan_lanc_dtapagamento').val():null;
        
        salvar(null, categoria, descricao, tipo, dtavencimento, valor, situacao, dtapagamento);
        
        return false;
    });

    function salvar(id, categoria, descricao, tipo, dtavencimento, valor, situacao, dtapagamento){
        
        $.ajax({
            url: '/finan/lancamentos/salvar',
            data:{
                id:id,
                categoria_id:categoria,
                descricao:descricao,
                tipo:tipo,
                dtavencimento:dtavencimento,
                valor:valor,
                situacao:situacao,
                dtapagamento:dtapagamento,
            }
        }).done(function (result) {
            
            if(!result.ok){
                if(id>0){
                    $('#finan_lanc_modal_alertas').showMessageTarge({type: 'danger', message: 'Ocorreu algum problema, verifique.'})
                } else {
                    $('#finan_lanc_alertas').showMessageTarge({type: 'danger', message: 'Ocorreu algum problema, verifique.'})
                }
                return false;
            }
            
            $('#finan_lanc_modal').modal('hide');
            $('#finan_lanc_alertas').showMessageTarge({type: 'success', message: 'Operação realizada com sucesso.'})
            limpaCampos();
            
        });
        
    }

    function limpaCampos(){
        $('#finan_lanc_cat').val(1);
        $('#finan_lanc_descricao, #finan_lanc_valor').val('');
    }

    $('#finan_lanc_pesquisar').click(function (){
        
        var data_inicio = $('#finan_lanc_pesq_inicio').val().split('/').reverse().join('-');
        var data_fim = $('#finan_lanc_pesq_fim').val().split('/').reverse().join('-');
        
        $.ajax({
            url: '/finan/lancamentos/buscaLancamentos',
            data:{
                inicio: data_inicio,
                fim: data_fim,
            }
        }).done(function(result){
            $('#finan_lanc_tab_lanc tbody').html('');
            
            if(result.error > 1){
                $('#finan_lanc_lancamentos_alertas').showMessageTarge({type: 'info', message: 'Nenhum resultado encontrado.'})
                return false;
            }
            
            $(result.result).each(function (i, cada){
                $('#finan_lanc_tab_lanc tbody').append('<tr data-id="'+cada.id+'"><td>'+cada.id+'</td><td>'+cada.descricao+'</td><td><button type="button" class="btn btn-default" name="edit"><i class="fa fa-edit"></i></button></td></tr>');
            })
            
        });
        
    });
    
    $('#finan_lanc_listagem').click(function (){
        
        var data_inicio = $('#finan_lanc_pesq_inicio').val();
        var data_fim = $('#finan_lanc_pesq_fim').val();
        
        $.ajax({
            url: '/finan/lancamentos/buscaLancamentosListagem',
            data:{
                inicio: data_inicio.split('/').reverse().join('-'),
                fim: data_fim.split('/').reverse().join('-'),
            }
        }).done(function(result){
            
            $('#finan_lanc_modal_list_tb_desp tbody, #finan_lanc_modal_list_tb_rec tbody, #finan_lanc_modal_list_tb_resumo tbody').html('');
            
            if(result.error > 1){
                $('#finan_lanc_lancamentos_alertas').showMessageTarge({type: 'info', message: 'Nenhum resultado encontrado.'})
                return false;
            }
            
            $('#finan_lanc_modal_list_inicio').html(data_inicio);
            $('#finan_lanc_modal_list_fim').html(data_fim);
            
            //==================================================================
            
            var lancamentos = result.lancamentos;
            var resumo = result.resumo;
            var categorias = result.categorias;
            
            $('#finan_lanc_modal_list_tb_desp tbody, #finan_lanc_modal_list_tb_rec tbody, #finan_lanc_modal_list_tb_resumo_cat tbody').html('');
            
            
            $(lancamentos).each(function (i, cada){
                
                var background = cada.situacao=='P'?'#deffde':'#ffeaea';
                
                cada.dtavencimento = cada.dtavencimento?cada.dtavencimento.split('-').reverse().join('/'):'-';
                cada.dtapagamento = cada.dtapagamento?cada.dtapagamento.split('-').reverse().join('/'):'-';
                
                if(cada.tipo === 'R'){
                    $('#finan_lanc_modal_list_tb_rec tbody').append('<tr data-id="'+cada.id+'" style="background:'+background+'"><td>'+cada.id+'</td><td>'+cada.descricao+'</td><td data-tipo="currency">'+cada.valor+'</td><td>'+cada.categoria_nome+'</td><td>'+cada.situacao+'</td><td>'+cada.dtavencimento+'</td><td>'+cada.dtapagamento+'</td><td><button type="button" class="btn btn-default" name="edit"><i class="fa fa-edit"></i></button></td></tr>');
                }
                
                if(cada.tipo === 'D'){
                    $('#finan_lanc_modal_list_tb_desp tbody').append('<tr data-id="'+cada.id+'" style="background:'+background+'"><td>'+cada.id+'</td><td>'+cada.descricao+'</td><td data-tipo="currency">'+cada.valor+'</td><td>'+cada.categoria_nome+'</td><td>'+cada.situacao+'</td><td>'+cada.dtavencimento+'</td><td>'+cada.dtapagamento+'</td><td><button type="button" class="btn btn-default" name="edit"><i class="fa fa-edit"></i></button></td></tr>');
                }
                
            });
            
            $(categorias).each(function (i, cada){
            
                var situacao = cada.situacao=='A'?'Aberto':'Pago';
                var tipo = cada.tipo=='R'?'Receita':'Despesa';
                
                $('#finan_lanc_modal_list_tb_resumo_cat tbody').append('<tr><td>'+cada.nome+'</td><td>'+tipo+'</td><td>'+situacao+'</td><td data-tipo="currency">'+cada.total+'</td></tr>');
                
            });
            
            var rec_total = parseFloat(resumo.receita_receber)+parseFloat(resumo.receita_caixa);
            var desp_total = parseFloat(resumo.despesa_pagar)+parseFloat(resumo.despesa_paga);
            var dizimo = resumo.dizimo>0?resumo.dizimo:0;
            var cor_saldo = resumo.caixa_total>=0?'blue':'red';
            
            $('#finan_lanc_modal_list_total_rec_receber').html('R$ '+resumo.receita_receber);
            $('#finan_lanc_modal_list_total_rec_caixa').html('R$ '+resumo.receita_caixa);
            $('#finan_lanc_modal_list_total_rec').html('R$ '+rec_total.toFixed(2));
            
            $('#finan_lanc_modal_list_total_desp_pagar').html('R$ '+resumo.despesa_pagar);
            $('#finan_lanc_modal_list_total_desp_paga').html('R$ '+resumo.despesa_paga);
            $('#finan_lanc_modal_list_total_desp').html('R$ '+desp_total.toFixed(2));
            
            $('#finan_lanc_modal_list_caixa_rec').html('R$ '+resumo.receita_caixa).attr('style','color:blue');
            $('#finan_lanc_modal_list_caixa_desp').html(' - R$ '+resumo.despesa_paga).attr('style','color:red');
            $('#finan_lanc_modal_list_caixa_total').html('R$ '+resumo.caixa_total).attr('style','color:'+cor_saldo);
            $('#finan_lanc_modal_list_dizimo').html('R$ '+dizimo).attr('style','color:blue');
            
            
            $('#finan_lanc_modal_listagem').modal();
        
            return false;
            
        });
        
    });
    
    $('#finan_lanc_tab_lanc, #finan_lanc_modal_list_tb_rec, #finan_lanc_modal_list_tb_rec').on('click', 'button', function (){
        var id = $(this).parents('tr').attr('data-id');
        
        $.ajax({
            url: '/finan/lancamentos/buscaLancamento',
            data:{ id:id }
        }).done(function (result){
            
            $('#finan_lanc_modal_cat').val(result.categoria_id);
            $('#finan_lanc_modal_descricao').val(result.descricao);
            
            if(result.tipo == 'D'){
                $('#finan_lanc_modal_tipo :radio[value="D"]').prop('checked', true);
            } else {
                $('#finan_lanc_modal_tipo :radio[value="R"]').prop('checked', true);
            }
            
            $('#finan_lanc_modal_dtavencimento').val(result.dtavencimento.split('-').reverse().join('/'));
            $('#finan_lanc_modal_valor').val(result.valor);
            $('#finan_lanc_modal_situacao').prop('checked', (result.situacao=='P'?true:false));
            
            if($('#finan_lanc_modal_situacao').prop('checked')){
                $('#finan_lanc_modal_dtapagamento').val(result.dtapagamento==null?null:result.dtapagamento.split('-').reverse().join('/'));
            }
            
            
            $('#finan_lanc_modal_situacao').change();
            $('#finan_lanc_modal_id').val(id);
            
            $('#finan_lanc_modal').modal();
            
        });
        
        
        
        return false;
    });
    
    $('#finan_lanc_modal_list_filtrar').click(function (){
        var text = $('#finan_lanc_modal_list_texto_filtro').val().trim();
        
        if(text===''){
            $('#finan_lanc_modal_list_tb_rec tbody tr').show();
            $('#finan_lanc_modal_list_tb_desp tbody tr').show();
            return false;
        }
        
        $('#finan_lanc_modal_list_tb_rec tbody td:nth-child(2)').each(function (i, cada){
            var desc = $(cada).html().toLowerCase();
            if(desc.indexOf(text)>=0){
                $(this).parents('tr').show();
            } else {
                $(this).parents('tr').hide();
            }
        });
        
        $('#finan_lanc_modal_list_tb_desp tbody td:nth-child(2)').each(function (i, cada){
            var desc = $(cada).html().toLowerCase();
            if(desc.indexOf(text)>=0){
                $(this).parents('tr').show();
            } else {
                $(this).parents('tr').hide();
            }
        });
        
        
    });
    
    $('#finan_lanc_modal_list_form').submit(function (){
        $('#finan_lanc_modal_list_filtrar').click();
        return false;
    });
    
    $('.btn-app[data-title=Financeiro]').click(function (){
        buscaCategorias();
    });
    
    /*SOBRE OS LANÇAMENTOS - FIM */
    
    /*SOBRE OS LANÇAMENTOS MODAL - INICIO */
    
    $('#finan_lanc_modal_situacao').change(function (){
        if($(this).prop('checked')){
            $('#finan_lanc_modal_dtapagamento').parents('.finan_lanc_modal_dtapagamento').removeClass('hide');
        } else {
            $('#finan_lanc_modal_dtapagamento').parents('.finan_lanc_modal_dtapagamento').addClass('hide');
        }
    });
    
    $('#finan_modal_form').submit(function (){
        
        var descricao = $('#finan_lanc_modal_descricao').val();
        var valor = $('#finan_lanc_modal_valor').val();
        
        if(descricao.trim().length < 1 || valor.trim().length < 1){
            $('#finan_lanc_modal_alertas').showMessageTarge({type: 'warning', message: 'Verifique os campos obrigatórios.'})
            return false;   
        }
        
        var id = $('#finan_lanc_modal_id').val();
        var categoria = $('#finan_lanc_modal_cat').val();
        var tipo = $('#finan_lanc_modal_tipo :radio:checked').val();
        var dtavencimento = $('#finan_lanc_modal_dtavencimento').val().split('/').reverse().join('-');
        var valor = $('#finan_lanc_modal_valor').val();
        var situacao = $('#finan_lanc_modal_situacao').prop('checked')?'P':'A';
        var dtapagamento = situacao=='A'?null:$('#finan_lanc_modal_dtapagamento').val().split('/').reverse().join('-');
        
        salvar(id, categoria, descricao, tipo, dtavencimento, valor, situacao, dtapagamento);
        
        return false;
    });
    
    /*SOBRE OS LANÇAMENTOS MODAL - FIM */

});
