import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import Spinner from '../components/Spinner';

function Orders() {
    const { user, logout, isAdmin } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newOrder, setNewOrder] = useState({ title: '', price: '' });
    const [submitting, setSubmitting] = useState(false);
    
    const userIsAdmin = isAdmin();

    useEffect(() => {
        fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError('');
            
            // Fetch user-specific orders if user is logged in and has an ID
            if (user?.id) {
                const response = await orderAPI.getByUserId(user.id);
                setOrders(response.orders || []);
            } else {
                // Fallback to getAll if no userId (shouldn't happen for logged in users)
                const response = await orderAPI.getAll();
                setOrders(response.orders || []);
            }
        } catch (err) {
            setError('Failed to fetch orders. Please try again.');
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const price = parseFloat(newOrder.price);
            if (isNaN(price) || price <= 0) {
                setError('Please enter a valid price');
                setSubmitting(false);
                return;
            }

            await orderAPI.create(newOrder.title, price);
            setNewOrder({ title: '', price: '' });
            setShowCreateForm(false);
            fetchOrders(); // Refresh orders list
        } catch (err) {
            setError(
                err.response?.data?.message || 
                err.message || 
                'Failed to create order. Please try again.'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm('Are you sure you want to delete this order?')) {
            return;
        }

        try {
            setError('');
            await orderAPI.delete(orderId);
            fetchOrders(); // Refresh orders list
        } catch (err) {
            console.error('Delete error:', err);
            let errorMessage = 'Failed to delete order. Please try again.';
            
            if (err.response?.status === 404) {
                errorMessage = 'Delete endpoint not found. The backend may not have a delete endpoint implemented.';
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
        }
    };

    return (
        <div className='min-h-screen py-12 px-4'>
            <div className='container mx-auto max-w-6xl'>
                {/* Header */}
                <div className='flex justify-between items-center mb-8'>
                    <div>
                        <h1 className='text-4xl font-bold text-white mb-2'>
                            {userIsAdmin ? 'All Orders' : 'My Orders'}
                        </h1>
                        <p className='text-white/60'>
                            {userIsAdmin ? 'View all orders in the system' : `Manage your orders, ${user?.email}`}
                        </p>
                    </div>
                    <div className='flex gap-4'>
                        {!userIsAdmin && (
                            <button
                                onClick={() => setShowCreateForm(!showCreateForm)}
                                className='px-6 py-3 bg-primary_important hover:bg-primary_hint text-white font-semibold rounded-lg transition duration-300'
                            >
                                {showCreateForm ? 'Cancel' : 'Create Order'}
                            </button>
                        )}
                        <button
                            onClick={logout}
                            className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300'
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Create Order Form - Only for users, not admins */}
                {!userIsAdmin && showCreateForm && (
                    <div className='bg-primary border border-primary_hint/20 rounded-xl p-6 mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-4'>Create New Order</h2>
                        <form onSubmit={handleCreateOrder} className='space-y-4'>
                            <div>
                                <label htmlFor='title' className='block text-sm font-semibold text-primary_hint mb-2'>
                                    Order Title
                                </label>
                                <input
                                    type='text'
                                    id='title'
                                    value={newOrder.title}
                                    onChange={(e) => setNewOrder({ ...newOrder, title: e.target.value })}
                                    required
                                    className='w-full px-4 py-3 bg-app_bg border border-primary_hint/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary_hint focus:border-transparent'
                                    placeholder='Enter order title'
                                />
                            </div>
                            <div>
                                <label htmlFor='price' className='block text-sm font-semibold text-primary_hint mb-2'>
                                    Price
                                </label>
                                <input
                                    type='number'
                                    id='price'
                                    step='0.01'
                                    min='0'
                                    value={newOrder.price}
                                    onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                                    required
                                    className='w-full px-4 py-3 bg-app_bg border border-primary_hint/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary_hint focus:border-transparent'
                                    placeholder='Enter price'
                                />
                            </div>
                            {error && (
                                <div className='p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm'>
                                    {error}
                                </div>
                            )}
                            <button
                                type='submit'
                                disabled={submitting}
                                className='w-full bg-primary_important hover:bg-primary_hint text-white font-semibold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {submitting ? 'Creating...' : 'Create Order'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Orders List */}
                <div className='bg-primary border border-primary_hint/20 rounded-xl overflow-hidden'>
                    <div className='p-6 border-b border-primary_hint/20'>
                        <h2 className='text-2xl font-bold text-white'>
                            {userIsAdmin ? 'All Orders' : 'Your Orders'}
                        </h2>
                    </div>

                    {loading ? (
                        <div className='p-12'>
                            <Spinner />
                        </div>
                    ) : error && !showCreateForm ? (
                        <div className='p-12 text-center'>
                            <p className='text-red-400 mb-4'>{error}</p>
                            <button
                                onClick={fetchOrders}
                                className='px-6 py-3 bg-primary_important hover:bg-primary_hint text-white font-semibold rounded-lg transition duration-300'
                            >
                                Retry
                            </button>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className='p-12 text-center'>
                            <p className='text-white/60 text-lg mb-4'>No orders found</p>
                            {!userIsAdmin && (
                                <button
                                    onClick={() => setShowCreateForm(true)}
                                    className='px-6 py-3 bg-primary_important hover:bg-primary_hint text-white font-semibold rounded-lg transition duration-300'
                                >
                                    Create Your First Order
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className='divide-y divide-primary_hint/10'>
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className='p-6 hover:bg-app_bg/50 transition duration-150 flex justify-between items-center'
                                >
                                    <div className='flex-1'>
                                        <h3 className='text-xl font-bold text-white mb-2'>{order.title}</h3>
                                        <div className='flex flex-wrap gap-4 text-sm mb-2'>
                                            {order.venue && (
                                                <span className='text-primary_hint'>
                                                    Venue: <span className='text-white'>{order.venue}</span>
                                                </span>
                                            )}
                                            {order.location && (
                                                <span className='text-primary_hint'>
                                                    Location: <span className='text-white'>{order.location}</span>
                                                </span>
                                            )}
                                            {order.eventDate && (
                                                <span className='text-primary_hint'>
                                                    Date: <span className='text-white'>{new Date(order.eventDate).toLocaleDateString()}</span>
                                                </span>
                                            )}
                                        </div>
                                        <div className='flex gap-6 text-sm'>
                                            <span className='text-primary_hint'>
                                                ID: <span className='text-white'>{order.id}</span>
                                            </span>
                                            <span className='text-primary_hint'>
                                                Price: <span className='text-white font-semibold'>${typeof order.totalPrice === 'number' ? order.totalPrice.toFixed(2) : parseFloat(order.totalPrice || order.price || 0).toFixed(2)}</span>
                                            </span>
                                            {order.createdAt && (
                                                <span className='text-primary_hint'>
                                                    Created: <span className='text-white'>{new Date(order.createdAt).toLocaleDateString()}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {!userIsAdmin && (
                                        <button
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className='ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300'
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Orders;

