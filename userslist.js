$(document).ready(function(){
   
    callUsersListApi();
   
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

    // myTable.clear();
    // $.each(json, function(index, value) {
    //     myTable.row.add(value);
    // });
    // myTable.draw();

    $('#addEmployeeModal').modal('hide')
    var str=""
    
    $('.mTbody').empty()
    if(json.length>0){
        for(var i=0;i<json.length; i++){
          str+=  `<tr id="`+json[i].user_id_mdb+`">`   
            console.log(json[i].user_id_mdb);
            str+=  `<td class="company_name">`+json[i].company_name+`</td>`
            str+= `<td class="department_type">`+json[i].department_type+`</td>`
            str+= `<td class="email_address">`+json[i].email_address+`</td>`
            str+= `<td class="employee_id">`+json[i].employee_id+`</td>`
            str+= `<td class="full_name">`+json[i].full_name+`</td>`
            str+= `<td class="page_permission_type">`+json[i].page_permission_type+`</td>`
            str+= `<td class="phone_number">`+json[i].phone_number+`</td>`
            str+= `<td class="status">`+json[i].status+`</td>`
            str+= `<td <label class="switch"> <input id=`+json[i].user_id_mdb+` type="checkbox"><span class="slider round"></span>
            </label> </td>`
            
            str+=`<td>
                 <a onclick="updateRow('`+json[i].user_id_mdb+`')"  href="#editModal" class="edit" data-toggle="modal">
                <i class="fas fa-edit" data-toggle="tooltip" title="Edit"></i>
                </a>
                <a onclick="confirmDelete('`+json[i].user_id_mdb+`')"   href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="fas fa-trash" data-toggle="tooltip" title="Edit"></i></a>
                 </td>   
            </tr>`
            
            
        }
        
        $('.mTbody').html(str);
        for(var i=0;i<json.length; i++){
            console.log(json.length)
            // console.log(json[i].status);
            if(json[i].status==true){
                console.log(json[i].user_id_mdb);
                var id =json[i].user_id_mdb
      document.getElementById(id).checked===true;
            }          
    }
}
    else{
        $('.mTbody').html("No data Available")
    }

}


function updateRow(id){
    console.log(id);
    $('.errMsg').html('')
    $( "#enditPatient input[name='id']" ).val(id);
    $( "#enditPatient input[name='company_name']" ).val($('#'+id).find('.company_name').text());
    $( "#enditPatient input[name='department_type']" ).val($('#'+id).find('.department_type').text());
    $( "#enditPatient input[name='email_address'" ).val($('#'+id).find('.email_address').text());
    $( "#enditPatient input[name='employee_id']" ).val($('#'+id).find('.employee_id').text());
    $( "#enditPatient input[name='full_name']" ).val($('#'+id).find('.full_name').text());
    // $( "#enditPatient input[name='page_permission_type']" ).val($('#'+id).find('.page_permission_type').text());
    $( "#enditPatient input[name='phone_number']" ).val($('#'+id).find('.phone_number').text());
    // $( "#enditPatient input[name='status']" ).val($('#'+id).find('.status').text());
   
}

 

function confirmDelete(id){
    console.log(id)
    $('.deleteData').attr('data-param',id)
}

function deleteRow(el){
    var id = $(el).attr('data-param')
    var json = {
        "user_id_mdb":id
    }
    console.log(json);
   
    docketrun.sendRequestToken('POST',baseUrl+'/user/remove', JSON.stringify(json), checkResponse);
}

function checkResponse(json){
    console.log(json);
    alert(json.message)
    if(json.success){
        
        docketrun.sendRequestToken('POST',baseUrl+'/user/list', JSON.stringify(json), showTable); 
    
        $('#deleteEmployeeModal').modal('hide')
        $('#addEmployeeModal').modal('hide')
        $('#editModal').modal('hide')
        
        
    }else{
        $('.errMsg').html(json.response)
    }
}

function updateRecord(id){
    a = document.getElementById("getid").value;
    console.log(a);
    var json  =  docketrun.formJson(id)
    json['user_id_mdb'] =a;
    json['token'] = "bvfdv";
    console.log(JSON.stringify(json));
    if(json){
        
        docketrun.sendRequestToken('POST',baseUrl+'/user/edit', JSON.stringify(json), checkResponse);
    }
}

function add(id){
    
    var json  =  docketrun.formJson(id)
    console.log(id);
 reffer_admin = document.getElementById("reffer").value;
    json['assigned_to'] =reffer_admin.split(" ");
    console.log(reffer_admin.split(" "));
     json['token'] = "bvfdv";
    console.log(JSON.stringify(json));
    if(json){
        docketrun.sendRequestToken('POST',baseUrl+'/add_user', JSON.stringify(json), checkResponse);
    }
            
}

function activate_user(id){
    var json  =  docketrun.formJson(id)
    for(var i=0;i<json.length; i++){
if(json[i].status==true){
   console.log(json[i])
    }else{

    }

    }

}