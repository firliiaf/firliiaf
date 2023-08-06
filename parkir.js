function createFormTambah(){
		$("#formTitle").html("Form Tambah Kelas")
		$("#formContent").html(`
			<div class="form-group">
				<input type="text" class="form-control" id="inputKelas" placeholder="Nama Kelas">
			</div>

			<div class="form-group">
				<button type="button" class="btn btn-block btn-info" id="btnAdd"> Tambah Kelas
				</button>
			</div>
			`)
	}

	createFormTambah()

function loadData(){
	$.ajax({
		url: "http://localhost/Laravel/a-xiirpl2/api/classes",
		type: "GET",
		beforeSend: function(){
			$("#listKelas").html(`
				<img src="5.gif" width="10px">
				`)
		},

		success: function(result){
			$("#listKelas").html('')
			var myData = JSON.parse(result);

			var no = 0

			$.each(myData, function(i, data){
				no += 1
				$("#listKelas").append(`
					<tr>
					<td>`+no+`</td>
					<td>`+data.nama+`</td>
					<td align='center'>
						<button onclick="deleteData(`+data.id+`)" class="btn btn-danger btn-sm">
						x
						</button>
						<button onclick="createFormEdit(`+data.id+`)" class="btn btn-success btn-sm">
						e
						</button>
					</td>
					</tr>
					`);

			})
		}

	})

}

function createFormEdit(id){
	$("#formTitle").html('Form Edit Kelas')

	$.ajax({
		url:"http://localhost/Laravel/a-xiirpl2/api/edit_class",
		type:"GET",
		data: { id : id },
		success: function(result){
			$("#formContent").html(result)
		}
	})
}

$("#btnAdd").click(function(){
	var kelas = $("#inputKelas").val();

	$.ajax({
		url: "http://localhost/Laravel/a-xiirpl2/api/classes",
		type: "POST",
		data: { nama: kelas },
		beforeSend: function(){
			$("#btnAdd").html(`
				<img src="5.gif" width="10px">
				`)
		},

		success: function(result){
			$("#btnAdd").html('Tambah Kelas')
			$("#inputKelas").val('')
			loadData()
		},
	})
})

function deleteData(id){
	var yakin = confirm("Hapus Data Ini")

	if (yakin) {
		$.ajax({
			url: "http://localhost/Laravel/a-xiirpl2/api/classes",
			type: "DELETE",
			data: { id : id },
			success: function(result){
				loadData()
			}
		})
	}else{

	}
}

function saveKelas(){
	var id = $("#idKelas").val()
	var kelas = $("#inputKelas").val()

	$.ajax({
		url:"http://localhost/Laravel/a-xiirpl2/api/classes",
		type:"PUT",
		data: { id : id , nama: kelas},
		success:function(){
			createFormEdit(id)
			loadData()
		}
	})
}

loadData()