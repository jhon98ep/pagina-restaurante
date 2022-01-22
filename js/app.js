function cargar() {
    $.ajax({
        url: 'http://localhost:3000/api/productos',
        method: 'get',
        dataType:'json',
        success: function (rs) {
            if(rs.code==200)
                $('#productos').empty()
                $.each(rs.data, function (index, value) {
                    $('#productos').append("<li class='productosLi'><div class='datos'><img src='http://localhost:3000/uploads/"+value['image']+"' width='200' height='200'/> </div> \
                    <div id='bajada'><p>"+value['categoria']+"</p><h2> "+value['nombre']+"</h2><p> "+value['descripcion']+"</p>\
                    <a href='#' class='delete' data-id='"+value['_id']+"'>eliminar</a>\
                    </div></li>")
                })
        }
    })

    $.ajax({
        url: 'http://localhost:3000/api/contatanos',
        method: 'get',
        dataType:'json',
        success: function (rs) {
            if(rs.code==200)
                $('#contatanos').empty()
                $.each(rs.data, function (index, value) {
                    $('#contatanos').append("<li class='productosLi'><div class='datos1'>"+value['email']+" "+value['telefono']+" "+value['detalles']+"\
                    <a href='#' class='delete1' data-id='"+value['_id']+"'>eliminar</a>\
                        </div></li>")
                })
        }//<a href='#' class='delete' data-id='"+value['_id']+"'>eliminar</a> por si necesito el eliminar
    })
}

$("#guardar").click(function () {
    let datos = new FormData()
    datos.append('image',$('#image')[0].files[0])
    datos.append('categoria',$('#categoria').val())
    datos.append('nombre',$('#nombre').val())
    datos.append('descripcion',$('#descripcion').val())
    

    $.ajax({
        url: 'http://localhost:3000/api/productos',
        method: 'post',
        dataType:'json',
        contentType: false,
        processData: false,
        data: datos,
        success: function (rs) {
            if (rs.code==200) {
                cargar()  
            }            
              
        }
    })
})

$("#guardar-cont").click(function () {
    datos = $("#form1").serialize()
    $.ajax({
        url: 'http://localhost:3000/api/contatanos',
        method: 'post',
        data: datos,
        success: function (rs) {
            if(rs.code==200)                
                $('#contatanos').append("<li>"+rs.data['email']+" "+rs.data['telefono']+" "+rs.data['detalles']+"</li>")
        }
    })
})

$(document).on("click", ".delete", function (e) {
    var confirma = confirm("¿esta seguro de eliminar?")
    if(confirma == true){
        e.preventDefault
        id = $(this).data('id')
        $.ajax({
            url: 'http://localhost:3000/api/producto/'+id,
            method: 'delete',
            dataType:'json',
            success: function (rs) {
                if(rs.code==200)
                    cargar()
            }
        })
    }else{
        alert('eliminacion cancelada')
    }    
})

$(document).on("click", ".delete1", function (e) {
    var confirma = confirm("¿esta seguro de eliminar?")
    if(confirma == true){
        e.preventDefault
        id = $(this).data('id')
        $.ajax({
            url: 'http://localhost:3000/api/contatano/'+id,
            method: 'deleteContacto',
            dataType:'json',
            success: function (rs) {
                if(rs.code==200)
                    cargar()
            }
        })
    }else{
        alert('eliminacion cancelada')
    }    
})

$("#btn-login").click(function () {

    let imp = $('#password').val()
    if (imp == 12345) {
        url = "./pages/index.html";
        $(location).attr('href',url);
    } else {
        alert('contraseña incorrecta')
    }
console.log(imp)
})

cargar()

