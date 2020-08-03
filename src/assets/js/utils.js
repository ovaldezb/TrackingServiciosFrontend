function doFilter(filter,nombre_tabla)
{
	var td, tr, found, i, j;
	var tabla = document.getElementById(nombre_tabla);
	 for (i = 0; i <tabla.rows.length; i++)
	 {
		 td = tabla.rows[i].cells;
		 for (j = 0; j < td.length; j++)
		 {			 
			 if (td[j].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1)
			 {				
				 found = true;
			 }
		 }
		 if (found) {
			tabla.rows[i].style.display = "";
			found = false;
		} else {
			tabla.rows[i].style.display = "none";
		}
	 }
}