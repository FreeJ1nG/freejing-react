import { useState } from 'react';

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockChange }) {
  return (
    <form>
      <input
        type = "text"
        value = { filterText }
        placeholder = "Search..."
        onChange = {(e) => {
          onFilterTextChange(e.target.value);
          console.log(e)
        }}
      />
      <label for = "show_in_stock">
        <br />
        <input
          type = "checkbox"
          name = "show_in_stock"
          value = { inStockOnly }
          onChange = {(e) => onInStockChange(e.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];

  let lastCategory = null;
  for (var product of products) {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) == -1) continue;
    if (!product.stocked && inStockOnly) continue;
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow category = { product.category } key = { product.category } />
      );
    }
    rows.push(
      <ProductRow product = { product } key = { product.name } />
    );
    lastCategory = product.category;
  }

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
      { rows }
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colspan = "2">{ category }</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style = {{ color: 'red' }}>
      { product.name }
    </span>;
  return (
    <tr>
      <td>{ name } </td>
      <td>{ product.price }</td>
    </tr>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText = { filterText }
        inStockOnly = { inStockOnly }
        onFilterTextChange = { setFilterText }
        onInStockChange = { setInStockOnly }
      />
      <ProductTable
        filterText = { filterText }
        inStockOnly = { inStockOnly }
        products = { products }
      />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function ShoppingList() {
  return (
    <FilterableProductTable products = { PRODUCTS } />
  );
}
