import React, { useEffect, useState } from 'react';
import type { Enquiry, EnquiryStatus } from '../types';
import { deleteEnquiryApi, fetchEnquiries, updateEnquiryStatus } from '../services/api';

export const AdminDashboard: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchEnquiries({
        search,
        user_type: userTypeFilter,
        status: statusFilter,
      });
      setEnquiries(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load enquiries from database backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userTypeFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleStatusChange = async (id: string | number, newStatus: EnquiryStatus) => {
    try {
      const updated = await updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) => prev.map((item) => (item.id === id ? updated : item)));
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(updated);
      }
    } catch (err: any) {
      alert(`Status update failed: ${err.message}`);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm(`Are you sure you want to delete enquiry #${id}?`)) return;
    try {
      await deleteEnquiryApi(id);
      setEnquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
    } catch (err: any) {
      alert(`Deletion failed: ${err.message}`);
    }
  };

  const getStatusBadgeClass = (status: EnquiryStatus) => {
    switch (status) {
      case 'New': return 'badge-status badge-new';
      case 'Contacted': return 'badge-status badge-contacted';
      case 'In Progress': return 'badge-status badge-progress';
      case 'Closed': return 'badge-status badge-closed';
      default: return 'badge-status';
    }
  };

  return (
    <section className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Enquiry Admin Dashboard</h1>
          <p className="dashboard-subtitle">Manage, filter, search, and update client lead enquiries.</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={loadData}>
          🔄 Refresh Data
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="dashboard-controls">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search by name, email, course, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary btn-sm">
            Search
          </button>
        </form>

        <div className="filter-group">
          <label>User Type:</label>
          <select
            className="form-input select-filter"
            value={userTypeFilter}
            onChange={(e) => setUserTypeFilter(e.target.value)}
          >
            <option value="All">All User Types</option>
            <option value="Student">Student</option>
            <option value="Customer">Customer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            className="form-input select-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Main Content Area: Loading, Error, Empty, or Data Table */}
      {loading ? (
        <div className="state-card loading-card">
          <div className="spinner"></div>
          <p>Loading enquiries from PostgreSQL database...</p>
        </div>
      ) : error ? (
        <div className="state-card error-card">
          <h3>⚠️ Unable to Load Enquiries</h3>
          <p>{error}</p>
          <p className="small-text">Make sure the backend server (npm run dev in backend) & PostgreSQL are active.</p>
          <button className="btn btn-primary btn-sm" onClick={loadData}>Retry</button>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="state-card empty-card">
          <h3>📭 No Enquiries Found</h3>
          <p>No enquiry records match your current search query or filter selection.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name & Contact</th>
                <th>User Type</th>
                <th>Service / Course</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((item) => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>
                    <div className="cell-name">{item.name}</div>
                    <div className="cell-sub">{item.email}</div>
                    <div className="cell-sub">{item.phone}</div>
                  </td>
                  <td>
                    <span className={`user-tag tag-${item.user_type.toLowerCase()}`}>
                      {item.user_type}
                    </span>
                  </td>
                  <td>{item.service_or_course}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>
                    <select
                      className={getStatusBadgeClass(item.status)}
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as EnquiryStatus)}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action view-btn"
                        title="View Details"
                        onClick={() => setSelectedEnquiry(item)}
                      >
                        View
                      </button>
                      <button
                        className="btn-action delete-btn"
                        title="Delete Enquiry"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Complete Enquiry Details Modal */}
      {selectedEnquiry && (
        <div className="modal-backdrop" onClick={() => setSelectedEnquiry(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Enquiry #{selectedEnquiry.id} Details</h2>
              <button className="modal-close" onClick={() => setSelectedEnquiry(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <strong>Name:</strong> <span>{selectedEnquiry.name}</span>
              </div>
              <div className="detail-row">
                <strong>Email:</strong> <span>{selectedEnquiry.email}</span>
              </div>
              <div className="detail-row">
                <strong>Phone:</strong> <span>{selectedEnquiry.phone}</span>
              </div>
              <div className="detail-row">
                <strong>User Type:</strong> <span>{selectedEnquiry.user_type}</span>
              </div>
              <div className="detail-row">
                <strong>Interest:</strong> <span>{selectedEnquiry.service_or_course}</span>
              </div>
              <div className="detail-row">
                <strong>Status:</strong>
                <select
                  className={getStatusBadgeClass(selectedEnquiry.status)}
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value as EnquiryStatus)}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="detail-row">
                <strong>Submitted At:</strong> <span>{new Date(selectedEnquiry.created_at).toLocaleString()}</span>
              </div>
              <div className="detail-block">
                <strong>Message:</strong>
                <p className="message-box">{selectedEnquiry.message}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(selectedEnquiry.id)}
              >
                Delete Enquiry
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedEnquiry(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
