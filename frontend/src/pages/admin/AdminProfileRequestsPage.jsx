import { useEffect, useState } from 'react';
import { 
  fetchProfileUpdateRequests, 
  decideProfileUpdateRequest, 
  fetchWorkplaceRoles 
} from '../../api/workplaceApi';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export default function AdminProfileRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError('');
    try {
      const [reqs, rs] = await Promise.all([
        fetchProfileUpdateRequests(),
        fetchWorkplaceRoles()
      ]);
      setRequests(reqs);
      setRoles(rs);
      if (reqs.length > 0) setSelectedId(reqs[0].id);
    } catch (e) {
      setError(e.message || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(id, action) {
    if (!window.confirm(`Are you sure you want to ${action.toLowerCase()} this request?`)) return;
    setProcessing(true);
    try {
      await decideProfileUpdateRequest(id, action);
      setRequests(prev => prev.filter(r => r.id !== id));
      if (selectedId === id) {
        const remaining = requests.filter(r => r.id !== id);
        setSelectedId(remaining.length > 0 ? remaining[0].id : null);
      }
    } catch (e) {
      alert(e.message || 'Action failed');
    } finally {
      setProcessing(false);
    }
  }

  const selectedRequest = requests.find(r => r.id === selectedId);
  const roleMap = roles.reduce((acc, r) => ({ ...acc, [r.id]: r.name }), {});

  const fields = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'degree', label: 'Degree' },
    { key: 'gradYear', label: 'Grad Year' },
    { key: 'branch', label: 'Branch' },
    { key: 'dob', label: 'Date of Birth' },
    { key: 'gender', label: 'Gender' },
    { key: 'registerNumber', label: 'Register Number' },
    { key: 'workplaceRoleId', label: 'Workplace Role', formatter: (val) => roleMap[val] || val },
  ];

  if (loading) return <div className="p-8 text-center text-gray-500">Loading requests...</div>;

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50/50">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-bold text-[#2D334A] flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Profile Requests
            <span className="ml-auto bg-blue-100 text-blue-700 text-xs py-0.5 px-2 rounded-full">
              {requests.length}
            </span>
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {requests.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <User className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p className="text-sm">No pending requests</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {requests.map(req => (
                <button
                  key={req.id}
                  onClick={() => setSelectedId(req.id)}
                  className={`w-full p-4 text-left transition-colors hover:bg-white ${
                    selectedId === req.id ? 'bg-white border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="font-semibold text-[#2D334A] truncate">{req.student_name}</div>
                  <div className="text-xs text-gray-500 mt-1 truncate">{req.student_email}</div>
                  <div className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">
                    {new Date(req.created_at).toLocaleDateString()} at {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50/30">
        {selectedRequest ? (
          <div className="max-w-4xl mx-auto p-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                <div>
                  <h1 className="text-xl font-bold text-[#2D334A]">{selectedRequest.student_name}</h1>
                  <p className="text-sm text-gray-500">Review profile change request</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction(selectedRequest.id, 'REJECT')}
                    disabled={processing}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(selectedRequest.id, 'APPROVE')}
                    disabled={processing}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 shadow-sm shadow-green-200 transition-colors disabled:opacity-50"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve Changes
                  </button>
                </div>
              </div>

              <div className="p-0">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50/80 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                      <th className="px-6 py-3 text-left w-1/4">Field</th>
                      <th className="px-6 py-3 text-left w-1/3">Current Value</th>
                      <th className="px-6 py-3 text-left border-l border-gray-100">Requested Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {fields.map(f => {
                      const oldVal = selectedRequest.old_data[f.key];
                      const newVal = selectedRequest.new_data[f.key];
                      const isChanged = String(oldVal) !== String(newVal);
                      
                      const displayOld = f.formatter ? f.formatter(oldVal) : oldVal;
                      const displayNew = f.formatter ? f.formatter(newVal) : newVal;

                      return (
                        <tr key={f.key} className={isChanged ? 'bg-amber-50/30' : ''}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-600">{f.label}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {displayOld || <span className="text-gray-300 italic">empty</span>}
                          </td>
                          <td className={`px-6 py-4 text-sm border-l border-gray-100 ${isChanged ? 'font-bold text-blue-600' : 'text-gray-400'}`}>
                            <div className="flex items-center gap-2">
                              {isChanged && <ArrowRight className="h-3 w-3 text-blue-400" />}
                              {displayNew || <span className="text-gray-300 italic">empty</span>}
                              {isChanged && (
                                <span className="ml-auto bg-blue-100 text-blue-600 text-[10px] py-0.5 px-1.5 rounded uppercase font-bold">
                                  Changed
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <p>
                    Approving this request will immediately update the student's profile in the main database. 
                    This action cannot be undone automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
            <div className="bg-white p-8 rounded-3xl border border-dashed border-gray-200">
              <User className="h-16 w-16 mx-auto mb-4 opacity-10" />
              <h3 className="text-lg font-semibold text-gray-600">Select a request</h3>
              <p className="text-sm max-w-xs mx-auto mt-2">
                Choose a profile update request from the sidebar to review and approve changes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
