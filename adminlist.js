
$(document).ready(function(){
   
    callAdminListApi();
   
});



// var myTable = $('#my_logs').DataTable({
//     "paging": true,
//     "lengthChange": true,
//     "searching": true,
//     "ordering": true,
//     "info": true,
//     "autoWidth": true,
//     "data": [],
//     "columns": [{
//         "title": "ID",
//         "data": "superadmin_id",
//         "className": "superadmin_id"
//     },{
//         "title": "Company",
//         "data": "company_name",
//         "className": "company_name"
//     }, {
//         "title": "Department",
//         "data": "department_type",
//         "className": "department_type"

//     }, {
//         "title": "Email",
//         "data": "email",
//         "className": "email"

//     }, {
//         "title": "Full Name",
//         "data": "full_name",
//         "className": "full_name"

//     }, {
//         "title": "Phone Number",
//         "data": "phone_number",
//         "className": "phone_number"

//     },{ data: "superadmin_id", render: function (data, type, row) {
//         return ` <a onclick="updateRow('`+row.superadmin_id+`')"  href="#editModal" class="edit" data-toggle="modal">
//         <i class="fas fa-edit" data-toggle="tooltip" title="Edit"></i>
//         </a>
//         <a onclick="confirmDelete('`+row.superadmin_id+`')"   href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="fas fa-trash" data-toggle="tooltip" title="Edit"></i></a> `
//       }
//     }]
// });



var showTable = function(json){
    json=json.message;
    console.log(json.length);

    $('#addEmployeeModal').modal('hide')
    var str=""
    
    $('.mTbody').empty()
    if(json.length>0){
        for(var i=0;i<json.length; i++){
          str+=  `<tr id="`+json[i].admin_id+`">`   
                   

            str+=  `<td class="company_name">`+json[i].company_name+`</td>`
            str+= `<td class="department_type">`+json[i].department_type+`</td>`
            str+= `<td class="email">`+json[i].email+`</td>`
            str+= `<td class="full_name">`+json[i].full_name+`</td>`
            str+= `<td class="phone_number">`+json[i].phone_number+`</td>`
            str+= `<td class="status">`+json[i].status+`</td>`
            // str+= `<td><label class="switch"><input type="checkbox" id="`+json[i].admin_id+`"><span class="slider round"></span>
            // </label> </td>`
            str+= `<td><input type="checkbox" id="`+json[i].admin_id+`"/>
             </td>`
            



            
            str+=`<td>
                 <a onclick="updateRow('`+json[i].admin_id+`')"  href="#editModal" class="edit" data-toggle="modal">
                <i class="fas fa-edit" data-toggle="tooltip" title="Edit"></i>
                </a>
                <a onclick="confirmDelete('`+json[i].admin_id+`')"   href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="fas fa-trash" data-toggle="tooltip" title="Edit"></i></a>
                 </td>

           
        
        

           
            </tr>`
            
        }
        $('.mTbody').html(str)
        
       

    }
    
    else{
        $('.mTbody').html("No data Available")
    }

    for(var i=0; i < json.length; i++){
        if(json[i].status == true){
            console.log(json[i].admin_id);
            var id=json[i].admin_id;
          
          
        document.getElementById("id").checked = true;
     
        }
    }
}


function updateRow(id){
    $('.errMsg').html('')
    $( "#dash_concept input[name='id']" ).val(id);
    $( "#dash_concept input[name='company_name']" ).val($('#'+id).find('.company_name').text());
    $( "#dash_concept input[name='department_type']" ).val($('#'+id).find('.department_type').text());
    $( "#dash_concept input[name='email'" ).val($('#'+id).find('.email').text());
    $( "#dash_concept input[name='full_name']" ).val($('#'+id).find('.full_name').text());
    $( "#dash_concept input[name='phone_number']" ).val($('#'+id).find('.phone_number').text());
   
}

 

function confirmDelete(id){
    console.log(id)
    $('.deleteData').attr('data-param',id)
}

function deleteRow(el){
    var id = $(el).attr('data-param')
    var json = {
        "admin_id":id
    }
    console.log(json);
   
    docketrun.sendRequestToken('POST',baseUrl+'/super_admin/remove_admin', JSON.stringify(json), checkResponse);
}

function checkResponse(json){
    console.log(json);
    alert(json.message)
    if(json.success){
        
        docketrun.sendRequestToken('POST',baseUrl+'/super_admin/list_admin', JSON.stringify(json), showTable); 
    
        $('#deleteEmployeeModal').modal('hide')
        $('#addEmployeeModal').modal('hide')
        $('#editModal').modal('hide')
        
        
    }else{
        $('.errMsg').html(json.response)
    }
}

function updateRecord(id){
    //console.log(id);
    var json  =  docketrun.formJson(id)
    json['token'] = "bvfdv";
    console.log(JSON.stringify(json));
    if(json){
        
        docketrun.sendRequestToken('POST',baseUrl+'/admin/edit_admin', JSON.stringify(json), checkResponse);
    }
}

function add(id){
   
    var json  =  docketrun.formJson(id)
     json['token'] = "bvfdv";
    console.log(JSON.stringify(json));
    if(json){
        docketrun.sendRequestToken('POST',baseUrl+'/super_admin/add_admin', JSON.stringify(json), checkResponse);
    }
            
}




