import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {BASE_URL} from '../../utils/Constant'
import axios from 'axios';
// import ProductsAPI from "../../Api/ProductsAPI";
export default function ProductList() {
  // const [products] = ProductsAPI().products;
  const [data, setData] = useState([]);

  useEffect(()=>{
    const getProducts = async () => {
      const res = await axios.get(BASE_URL + '/products/all');
      setData(res.data.items);
    }
    getProducts();

  },[])

  console.log(data);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "products",
      headerName: "Products",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image.url} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
  
    {
      field: "category",
      headerName: "category",
      width: 120,
    },
    {
      field: "price",
      headerName: "price",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[6,12,20,50]}
        emptyRowsWhenPaging={false}
               // make initial page size
        checkboxSelection
      />
    </div>
  );
}
