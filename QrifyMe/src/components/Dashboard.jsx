import React, { Component } from 'react';
import { withRouter } from './utils'; // Ensure you have this HOC or adjust according to your routing solution
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import swal from 'sweetalert';
import axios from 'axios';
import * as QRCodeReact from 'qrcode.react';
const QRCode = QRCodeReact.default;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      showQRModal: false, // existing modal for in-app QR code display
      showQRGenerator: false, // new state to show the Django QR generator
      openProductModal: false,
      openProductEditModal: false,
      id: '',
      name: '',
      desc: '',
      price: '',
      discount: '',
      fileName: '',
      page: 1,
      search: '',
      products: [],
      pages: 0,
      loading: false,
    };
  }

  // Toggle for the in-app QR code modal (if needed)
  toggleQRModal = () => {
    this.setState((prev) => ({ showQRModal: !prev.showQRModal }));
  };

  // New toggle for the Django QR generator modal
  toggleQRGenerator = () => {
    this.setState((prev) => ({ showQRGenerator: !prev.showQRGenerator }));
  };

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.navigate('/login');
    } else {
      this.setState({ token }, () => {
        this.getProduct();
      });
    }
  };

  getProduct = () => {
    this.setState({ loading: true });
    let queryParams = `?page=${this.state.page}`;
    if (this.state.search) {
      queryParams += `&search=${this.state.search}`;
    }
    axios
      .get(`http://localhost:3000/get-product${queryParams}`, {
        headers: { token: this.state.token },
      })
      .then((res) => {
        this.setState({
          loading: false,
          products: res.data.products,
          pages: res.data.pages,
        });
      })
      .catch((err) => {
        swal({ text: err.response.data.errorMessage, icon: 'error' });
        this.setState({ loading: false, products: [], pages: 0 });
      });
  };

  deleteProduct = (id) => {
    axios
      .post(
        'http://localhost:3000/delete-product',
        { id },
        {
          headers: {
            'Content-Type': 'application/json',
            token: this.state.token,
          },
        }
      )
      .then((res) => {
        swal({ text: res.data.title, icon: 'success' });
        this.setState({ page: 1 }, () => {
          this.pageChange(null, 1);
        });
      })
      .catch((err) => {
        swal({ text: err.response.data.errorMessage, icon: 'error' });
      });
  };

  pageChange = (e, page) => {
    this.setState({ page }, () => {
      this.getProduct();
    });
  };

  logOut = () => {
    localStorage.removeItem('token');
    this.props.navigate('/login');
  };

  onChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ fileName: e.target.files[0].name });
    }
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (e.target.name === 'search') {
        this.setState({ page: 1 }, () => {
          this.getProduct();
        });
      }
    });
  };

  addProduct = () => {
    const fileInput = document.querySelector('#fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('name', this.state.name);
    formData.append('desc', this.state.desc);
    formData.append('discount', this.state.discount);
    formData.append('price', this.state.price);

    axios
      .post('http://localhost:3000/add-product', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          token: this.state.token,
        },
      })
      .then((res) => {
        swal({ text: res.data.title, icon: 'success' });
        this.handleProductClose();
        this.setState(
          { name: '', desc: '', discount: '', price: '', fileName: '', page: 1 },
          () => {
            this.getProduct();
          }
        );
      })
      .catch((err) => {
        swal({ text: err.response.data.errorMessage, icon: 'error' });
        this.handleProductClose();
      });
  };

  updateProduct = () => {
    const fileInput = document.querySelector('#fileInput');
    const formData = new FormData();
    formData.append('id', this.state.id);
    formData.append('file', fileInput.files[0]);
    formData.append('name', this.state.name);
    formData.append('desc', this.state.desc);
    formData.append('discount', this.state.discount);
    formData.append('price', this.state.price);

    axios
      .post('http://localhost:3000/update-product', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          token: this.state.token,
        },
      })
      .then((res) => {
        swal({ text: res.data.title, icon: 'success' });
        this.handleProductEditClose();
        this.setState(
          { name: '', desc: '', discount: '', price: '', fileName: '' },
          () => {
            this.getProduct();
          }
        );
      })
      .catch((err) => {
        swal({ text: err.response.data.errorMessage, icon: 'error' });
        this.handleProductEditClose();
      });
  };

  handleProductOpen = () => {
    this.setState({
      openProductModal: true,
      id: '',
      name: '',
      desc: '',
      price: '',
      discount: '',
      fileName: '',
    });
  };

  handleProductClose = () => {
    this.setState({ openProductModal: false });
  };

  handleProductEditOpen = (data) => {
    this.setState({
      openProductEditModal: true,
      id: data._id,
      name: data.name,
      desc: data.desc,
      price: data.price,
      discount: data.discount,
      fileName: data.image,
    });
  };

  handleProductEditClose = () => {
    this.setState({ openProductEditModal: false });
  };

  render() {
    const userId = localStorage.getItem("user_id");
    const menuUrl = `http://localhost:3000/menu/${userId}`;
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 p-6">
          {this.state.loading && (
            <div className="w-full bg-blue-500 h-1 animate-pulse"></div>
          )}

          {/* Header with Dashboard title and action buttons */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <div>
              <button
                onClick={this.handleProductOpen}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
              >
                Add Product
              </button>
              <button
                onClick={this.logOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* New Section: Quote and Getting Started button for QR code generation */}
          <div className="text-center my-8">
            <h3 className="text-2xl font-bold">Simplify Your Menu, Amplify Your Business</h3>
            <p className="mt-2">Generate your digital menu QR code and boost your business.</p>
            <button
              onClick={this.toggleQRGenerator}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Getting Started
            </button>
          </div>

          {/* Product Table and Search */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <div className="p-4">
              <input
                type="search"
                autoComplete="off"
                name="search"
                value={this.state.search}
                onChange={this.onChange}
                placeholder="Search by product name"
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {this.state.products.map((row) => (
                  <tr key={row._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={`http://localhost:3000/${row.image}`}
                        alt="product"
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.desc}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.discount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => this.handleProductEditOpen(row)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.deleteProduct(row._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-center">
              <nav className="inline-flex">
                {Array.from({ length: this.state.pages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => this.pageChange(e, index + 1)}
                    className={`px-3 py-1 border ${
                      this.state.page === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Add Product Modal */}
          {this.state.openProductModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6">
                <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Product Name"
                  className="border border-gray-300 p-2 rounded w-full mb-3"
                  required
                />
                <input
                  type="text"
                  name="desc"
                  value={this.state.desc}
                  onChange={this.onChange}
                  placeholder="Description"
                  className="border border-gray-300 p-2 rounded w-full mb-3"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  placeholder="Price"
                  className="border border-gray-300 p-2 rounded w-full mb-3"
                  required
                />
                <input
                  type="number"
                  name="discount"
                  value={this.state.discount}
                  onChange={this.onChange}
                  placeholder="Discount"
                  className="border border-gray-300 p-2 rounded w-full mb-3"
                  required
                />
                <div className="flex items-center mb-4">
                  <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={this.onChange}
                      id="fileInput"
                      className="hidden"
                      required
                    />
                  </label>
                  <span className="ml-3">{this.state.fileName}</span>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={this.handleProductClose}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={
                      this.state.name === '' ||
                      this.state.desc === '' ||
                      this.state.discount === '' ||
                      this.state.price === '' ||
                      !this.state.fileName
                    }
                    onClick={this.addProduct}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Product Modal */}
          {this.state.openProductEditModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6">
                <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Product Name"
                  className="border border-gray-300 p-2 rounded w-full mb-3"
                  required
                />
                <input
                  type="text"
                  name="desc"
                  value={this.state.desc}
                  onChange={this.onChange}
                  placeholder="Description"
                  className="border border-gray-300 p-2 rounded w-full mb-3"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  placeholder="Price"
                  className="border border-gray-300 p-2 rounded w-full mb-3"
                  required
                />
                <input
                  type="number"
                  name="discount"
                  value={this.state.discount}
                  onChange={this.onChange}
                  placeholder="Discount"
                  className="border border-gray-300 p-2 rounded w-full mb-3"
                  required
                />
                <div className="flex items-center mb-4">
                  <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={this.onChange}
                      id="fileInput"
                      className="hidden"
                      required
                    />
                  </label>
                  <span className="ml-3">{this.state.fileName}</span>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={this.handleProductEditClose}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={
                      this.state.name === '' ||
                      this.state.desc === '' ||
                      this.state.discount === '' ||
                      this.state.price === ''
                    }
                    onClick={this.updateProduct}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Edit Product
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Existing in-app QR Code Modal */}
          {this.state.showQRModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Scan to View Menu</h2>
                <QRCode value={menuUrl} size={200} />
                <p className="mt-4 text-center">{menuUrl}</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={this.toggleQRModal}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* New Modal: Django QR Code Generator via iframe */}
          {this.state.showQRGenerator && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg w-11/12 md:w-3/4 p-6 relative">
                <button
                  onClick={this.toggleQRGenerator}
                  className="absolute top-2 right-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
                <iframe
                    src="http://localhost:8000/"
                    width="100%"
                    height="600px"
                    title="QR Code Generator"
                    frameBorder="0"
                ></iframe>

              </div>
            </div>
          )}

          <div className="flex justify-end mb-4">
            <button
              onClick={this.toggleQRModal}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Show Menu QR Code
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(Dashboard);
