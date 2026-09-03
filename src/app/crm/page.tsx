'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import '../../styles/crm.css';

interface FormData {
  propertyId?: string;
  propertyTitle?: string;
  propertyType?: string;
  location?: string;
  fullAddress?: string;
  askingPrice?: string;
  pricePerSqFt?: string;
  totalArea?: string;
  plotDimensions?: string;
  frontage?: string;
  facing?: string;
  roadWidth?: string;
  builtUpArea?: string;
  floors?: string;
  bedrooms?: string;
  bathrooms?: string;
  patta?: boolean;
  ec?: boolean;
  approvalStatus?: boolean | string;
  water?: boolean;
  electricity?: boolean;
  drainage?: boolean;
  ownershipTitle?: boolean | string;
  otherDocuments?: boolean | string;
  googleMapsLink?: string;
  landmark1?: string;
  distance1?: string;
  landmark2?: string;
  distance2?: string;
  landmark3?: string;
  distance3?: string;
  landmark4?: string;
  distance4?: string;
  saveAsDraft?: boolean;
}

const formatNumber = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function CrmPage() {
  // Sample properties (in a real app, fetch from API)
  const [properties, setProperties] = useState([
    {
      id: "RB-PROP-001",
      title: "Luxury Villa in Besant Nagar",
      type: "House",
      location: "Besant Nagar, Chennai",
      price: 15000000,
      status: "available",
      createdDate: "2024-01-15",
      photo: "https://via.placeholder.com/400x300?text=Property+1"
    },
    {
      id: "RB-PROP-002",
      title: "Premium Apartment in Adyar",
      type: "Apartment",
      location: "Adyar, Chennai",
      price: 8500000,
      status: "sold",
      createdDate: "2024-02-20",
      photo: "https://via.placeholder.com/400x300?text=Property+2"
    },
    {
      id: "RB-PROP-003",
      title: "Commercial Plot in OMR",
      type: "Land",
      location: "Old Mahabalipuram Road, Chennai",
      price: 12000000,
      status: "available",
      createdDate: "2024-03-10",
      photo: "https://via.placeholder.com/400x300?text=Property+3"
    }
  ]);

  const [activePage, setActivePage] = useState('properties'); // 'properties' | 'add-property'
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [formData, setFormData] = useState<FormData>({});
  const [sellingPoints, setSellingPoints] = useState<string[]>([]);
  const [previewMainImg, setPreviewMainImg] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Refs for file inputs
  const mainFileRef = useRef<HTMLInputElement | null>(null);
  const additionalFileRef = useRef<HTMLInputElement | null>(null);
  const streetFileRef = useRef<HTMLInputElement | null>(null);
  const siteFileRef = useRef<HTMLInputElement | null>(null);

  // Navigation
  const navigateTo = (page: 'properties' | 'add-property') => {
    setActivePage(page);
    if (page === 'properties') resetForm();
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({});
    setSellingPoints([]);
    setPreviewMainImg(null);
    if (mainFileRef.current) mainFileRef.current.value = '';
    if (additionalFileRef.current) additionalFileRef.current.value = '';
    if (streetFileRef.current) streetFileRef.current.value = '';
    if (siteFileRef.current) siteFileRef.current.value = '';
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  const goNext = () => {
    if (currentStep < totalSteps) {
      if (validateStep(currentStep)) {
        saveStepData(currentStep);
        setCurrentStep(s => s + 1);
      }
    } else {
      if (validateStep(currentStep)) {
        saveStepData(currentStep);
        // In a real app, you would POST to an API here.
        // For demo, add to local state.
        const newProp = {
          id: formData.propertyId || `RB-PROP-${Date.now()}`,
          title: formData.propertyTitle || 'Untitled Property',
          type: formData.propertyType || 'House',
          location: formData.location || 'Unknown',
          price: Number(formData.askingPrice) || 0,
          status: formData.saveAsDraft ? 'draft' : 'available',
          createdDate: new Date().toISOString().slice(0, 10),
          photo: previewMainImg
            ? URL.createObjectURL(mainFileRef.current?.files?.[0] as File)
            : 'https://via.placeholder.com/400x300?text=No+Image'
        };
        setProperties(prev => [newProp, ...prev]); // newest first
        alert(formData.saveAsDraft ? 'Saved as draft!' : 'Property published!');
        navigateTo('properties');
      }
    }
  };

  const validateStep = (step: number): boolean => {
    const stepEl = document.querySelector(`.form-step-content[data-step="${step}"]`);
    if (!stepEl) return true;
    const inputs = stepEl.querySelectorAll('input[required], select[required], textarea[required]');
    let ok = true;
    inputs.forEach(inp => {
      const el = inp as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      if (!el.value.trim()) {
        ok = false;
        inp.classList.add('is-invalid');
      } else {
        inp.classList.remove('is-invalid');
      }
    });
    return ok;
  };

  const saveStepData = (step: number) => {
    const stepEl = document.querySelector(`.form-step-content[data-step="${step}"]`);
    if (!stepEl) return;
    const inputs = stepEl.querySelectorAll('input, select, textarea');
    inputs.forEach(inp => {
      const el = inp as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      if (el.name) setFormData(fd => ({ ...fd, [el.name]: el.value }));
      else if (el.id) setFormData(fd => ({ ...fd, [el.id]: el.value }));
    });
    const checks = stepEl.querySelectorAll('input[type="checkbox"]');
    checks.forEach(cb => {
      const checkbox = cb as HTMLInputElement;
      setFormData(fd => ({ ...fd, [checkbox.id]: checkbox.checked }));
    });
  };

  const addSellingPoint = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.querySelector('.selling-point-input input') as HTMLInputElement;
    const val = input.value.trim();
    if (val) {
      setSellingPoints([...sellingPoints, val]);
      input.value = '';
    }
  };

  const removeSellingPoint = (idx: number) => {
    setSellingPoints(sellingPoints.filter((_, i) => i !== idx));
  };

  const handleMainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewMainImg(url);
      setFormData(fd => ({ ...fd, mainPhotoFile: file }));
    }
  };

  const handleAdditionalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(fd => ({ ...fd, additionalPhotos: e.target.files }));
  };

  const handleStreetFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(fd => ({ ...fd, streetViewFile: e.target.files?.[0] }));
  };

  const handleSiteFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(fd => ({ ...fd, sitePlanFile: e.target.files?.[0] }));
  };

  // Effect to clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewMainImg) URL.revokeObjectURL(previewMainImg);
    };
  }, [previewMainImg]);

  return (
    <>
      {/* Sidebar (you could replace this with your site's layout component) */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Royal Builders</h2>
        </div>
        <nav className="sidebar-nav">
          <Link href="/" className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link href="/crm" className={`nav-item ${activePage === 'properties' ? 'active' : ''}`}>
            Properties
          </Link>
          <Link href="/crm/leads" className={`nav-item ${activePage === 'leads' ? 'active' : ''}`}>
            Leads
          </Link>
          <Link href="/crm/clients" className={`nav-item ${activePage === 'clients' ? 'active' : ''}`}>
            Clients
          </Link>
          <Link href="/crm/site-visits" className={`nav-item ${activePage === 'site-visits' ? 'active' : ''}`}>
            Site Visits
          </Link>
          <Link href="/crm/estimates" className={`nav-item ${activePage === 'estimates' ? 'active' : ''}`}>
            Estimates
          </Link>
          <Link href="/crm/projects" className={`nav-item ${activePage === 'projects' ? 'active' : ''}`}>
            Projects
          </Link>
          <Link href="/crm/follow-ups" className={`nav-item ${activePage === 'follow-ups' ? 'active' : ''}`}>
            Follow-ups
          </Link>
          <Link href="/crm/reports" className={`nav-item ${activePage === 'reports' ? 'active' : ''}`}>
            Reports
          </Link>
          <Link href="/crm/settings" className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}>
            Settings
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <header className="app-header">
          <div className="header-left">
            <h1>Royal Builders CRM</h1>
          </div>
          <div className="header-center">
            <input type="text" className="search-bar" placeholder="Search properties, clients, …" />
          </div>
          <div className="header-right">
            <div className="user-menu">
              <img src="https://via.placeholder.com/40" alt="User" className="user-avatar" />
              <span className="username">Sanjay</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </header>

        <section className="page-content" style={{ padding: '2rem', minHeight: `calc(100vh - 70px)` }}>
          {/* Properties Page */}
          {activePage === 'properties' && (
            <>
              <div className="page-header">
                <h2>Properties</h2>
                <button className="btn-primary" onClick={() => navigateTo('add-property')}>
                  + Add Property
                </button>
              </div>
              <div className="filters-bar">
                <input
                  type="text"
                  className="filter search-input"
                  id="property-search"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select className="filter" id="property-type-filter">
                  <option value="">All Types</option>
                  <option value="land">Land</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="commercial">Commercial</option>
                </select>
                <select className="filter" id="location-filter">
                  <option value="">All Locations</option>
                  <option value="chennai">Chennai</option>
                  <option value="coimbatore">Coimbatore</option>
                  <option value="madurai">Madurai</option>
                </select>
                <select className="filter" id="price-filter">
                  <option value="">All Prices</option>
                  <option value="0-50">Under ₹50 Lakhs</option>
                  <option value="50-100">₹50-100 Lakhs</option>
                  <option value="100-200">₹1-2 Crores</option>
                  <option value="200-500">₹2-5 Crores</option>
                  <option value="500-above">Above ₹5 Crores</option>
                </select>
                <select className="filter" id="status-filter">
                  <option value="">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
              <div className="properties-grid" id="properties-grid">
                {properties.filter(p =>
                  !searchTerm ||
                  p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  p.type.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((p) => (
                  <div key={p.id} className="property-card">
                    <div className="property-card-header">
                      <img src={p.photo} alt={p.title} />
                      <div className={`property-status-badge status-${p.status}`}>
                        {p.status.toUpperCase()}
                      </div>
                    </div>
                    <div className="property-card-body">
                      <h3 className="property-title">{p.title}</h3>
                      <div className="property-meta">
                        <div><strong>ID:</strong> {p.id}</div>
                        <div><strong>Type:</strong> {p.type}</div>
                        <div><strong>Location:</strong> {p.location}</div>
                      </div>
                      <div className="property-price">₹ {formatNumber(p.price)}</div>
                      <div className="property-actions">
                        <button>View</button>
                        <button>Edit</button>
                        <button>Duplicate</button>
                        <button>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Add Property Page */}
          {activePage === 'add-property' && (
            <div className="page">
              <div className="page-header">
                <h2>Add New Property</h2>
                <Link href="/crm" className="btn-secondary">
                  ← Back to Properties
                </Link>
              </div>
              <div className="add-property-container">
                {/* Step indicator */}
                <div className="form-steps">
                  {[1, 2, 3, 4, 5, 6].map((s) => (
                    <div
                      key={s}
                      className={`form-step ${currentStep === s ? 'active' : ''}`}
                      data-step={s}
                    >
                      Step {s}
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form className="property-fields" onSubmit={(e) => e.preventDefault()}>
                  {/* Step 1: Basic Details */}
                  <div className="form-step-content" data-step="1">
                    <div className="form-group">
                      <label htmlFor="property-id">Property ID *</label>
                      <input
                        id="property-id"
                        type="text"
                        placeholder="e.g., RB-PROP-001"
                        required
                        value={formData.propertyId || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, propertyId: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="property-title">Property Title *</label>
                      <input
                        id="property-title"
                        type="text"
                        placeholder="e.g., Luxury Villa in Besant Nagar"
                        required
                        value={formData.propertyTitle || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, propertyTitle: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="property-type">Property Type *</label>
                      <select
                        id="property-type"
                        required
                        value={formData.propertyType || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, propertyType: e.target.value }))}
                      >
                        <option value="">Select Type</option>
                        <option value="land">Land</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">Location *</label>
                      <input
                        id="location"
                        type="text"
                        placeholder="e.g., Besant Nagar, Chennai"
                        required
                        value={formData.location || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, location: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="full-address">Full Address</label>
                      <textarea
                        id="full-address"
                        rows={2}
                        placeholder="Street, Landmark, City, PIN"
                        value={formData.fullAddress || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, fullAddress: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="asking-price">Asking Price * (₹)</label>
                      <input
                        id="asking-price"
                        type="number"
                        placeholder="e.g., 15000000"
                        required
                        value={formData.askingPrice || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, askingPrice: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="price-per-sqft">Price per Sq.Ft (₹)</label>
                      <input
                        id="price-per-sqft"
                        type="number"
                        placeholder="e.g., 12000"
                        value={formData.pricePerSqFt || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, pricePerSqFt: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Step 2: Property Specifications */}
                  <div className="form-step-content" data-step="2">
                    <div className="form-group">
                      <label htmlFor="total-area">Total Area (Sq.Ft)</label>
                      <input
                        id="total-area"
                        type="number"
                        placeholder="e.g., 2400"
                        value={formData.totalArea || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, totalArea: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="plot-dimensions">Plot Dimensions</label>
                      <input
                        id="plot-dimensions"
                        type="text"
                        placeholder="e.g., 40x60"
                        value={formData.plotDimensions || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, plotDimensions: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="frontage">Frontage (ft)</label>
                      <input
                        id="frontage"
                        type="number"
                        placeholder="e.g., 40"
                        value={formData.frontage || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, frontage: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="facing">Facing</label>
                      <select
                        id="facing"
                        value={formData.facing || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, facing: e.target.value }))}
                      >
                        <option value="">Select Facing</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                        <option value="north-east">North-East</option>
                        <option value="north-west">North-West</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="road-width">Road Width (ft)</label>
                      <input
                        id="road-width"
                        type="number"
                        placeholder="e.g., 30"
                        value={formData.roadWidth || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, roadWidth: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="built-up-area">Built-up Area (Sq.Ft)</label>
                      <input
                        id="built-up-area"
                        type="number"
                        placeholder="e.g., 1800"
                        value={formData.builtUpArea || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, builtUpArea: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="floors">Floors</label>
                      <input
                        id="floors"
                        type="number"
                        placeholder="e.g., 2"
                        value={formData.floors || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, floors: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bedrooms">Bedrooms</label>
                      <input
                        id="bedrooms"
                        type="number"
                        placeholder="e.g., 3"
                        value={formData.bedrooms || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, bedrooms: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bathrooms">Bathrooms</label>
                      <input
                        id="bathrooms"
                        type="number"
                        placeholder="e.g., 3"
                        value={formData.bathrooms || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, bathrooms: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Step 3: Selling Points */}
                  <div className="form-step-content" data-step="3">
                    <div className="form-group">
                      <label>Selling Points (Add 3‑5 highlights)</label>
                      <div className="selling-point-input">
                        <input
                          type="text"
                          className="selling-point"
                          placeholder="Enter selling point (e.g., Prime residential location)"
                        />
                        <button
                          type="button"
                          className="btn-small btn-outline"
                          onClick={addSellingPoint}
                        >
                          + Add
                        </button>
                      </div>
                      <div className="selling-points-list" id="selling-points-list">
                        {sellingPoints.map((pt, idx) => (
                          <div key={idx} className="selling-point-tag">
                            {pt}
                            <button
                              type="button"
                              className="remove-btn"
                              onClick={() => removeSellingPoint(idx)}
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Legal / Utilities */}
                  <div className="form-step-content" data-step="4">
                    <div className="form-group">
                      <label>Legal Documents</label>
                      <div className="utils-grid">
                        <div>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              id="patta"
                              checked={formData.patta || false}
                              onChange={(e) => setFormData(fd => ({ ...fd, patta: e.target.checked }))}
                            />
                            Patta
                          </label>
                        </div>
                        <div>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              id="ec"
                              checked={formData.ec || false}
                              onChange={(e) => setFormData(fd => ({ ...fd, ec: e.target.checked }))}
                            />
                            EC
                          </label>
                        </div>
                        <div>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              id="approval-status"
                              checked={!!formData.approvalStatus}
                              onChange={(e) => setFormData(fd => ({ ...fd, approvalStatus: e.target.checked }))}
                            />
                            Approval Status
                          </label>
                        </div>
                        <div>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              id="water"
                              checked={formData.water || false}
                              onChange={(e) => setFormData(fd => ({ ...fd, water: e.target.checked }))}
                            />
                            Water Connection
                          </label>
                        </div>
                        <div>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              id="electricity"
                              checked={formData.electricity || false}
                              onChange={(e) => setFormData(fd => ({ ...fd, electricity: e.target.checked }))}
                            />
                            Electricity Connection
                          </label>
                        </div>
                        <div>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              id="drainage"
                              checked={formData.drainage || false}
                              onChange={(e) => setFormData(fd => ({ ...fd, drainage: e.target.checked }))}
                            />
                            Drainage
                          </label>
                        </div>
                        <div>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              id="ownership-title"
                              checked={!!formData.ownershipTitle}
                              onChange={(e) => setFormData(fd => ({ ...fd, ownershipTitle: e.target.checked }))}
                            />
                            Ownership / Title Clear
                          </label>
                        </div>
                        <div>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              id="other-documents"
                              checked={!!formData.otherDocuments}
                              onChange={(e) => setFormData(fd => ({ ...fd, otherDocuments: e.target.checked }))}
                            />
                            Other Documents
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="documents-upload">Upload Documents (PDF, JPG, PNG)</label>
                      <div className="upload-area" id="documents-upload-area">
                        <p>Drag & drop files here or click to select</p>
                        <input
                          type="file"
                          id="documents-upload"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 5: Location */}
                  <div className="form-step-content" data-step="5">
                    <div className="form-group">
                      <label htmlFor="google-maps-link">Google Maps Link</label>
                      <input
                        id="google-maps-link"
                        type="url"
                        placeholder="https://maps.google.com/?q=..."
                        value={formData.googleMapsLink || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, googleMapsLink: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="landmark1">Nearby Landmark 1</label>
                      <input
                        id="landmark1"
                        type="text"
                        placeholder="e.g., Besant Nagar Beach"
                        value={formData.landmark1 || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, landmark1: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="distance1">Distance (km)</label>
                      <input
                        id="distance1"
                        type="number"
                        placeholder="e.g., 0.5"
                        value={formData.distance1 || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, distance1: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="landmark2">Nearby Landmark 2</label>
                      <input
                        id="landmark2"
                        type="text"
                        placeholder="e.g., Elliot's Beach"
                        value={formData.landmark2 || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, landmark2: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="distance2">Distance (km)</label>
                      <input
                        id="distance2"
                        type="number"
                        placeholder="e.g., 1.2"
                        value={formData.distance2 || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, distance2: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="landmark3">Nearby Landmark 3</label>
                      <input
                        id="landmark3"
                        type="text"
                        placeholder="e.g., Adyar Cancer Institute"
                        value={formData.landmark3 || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, landmark3: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="distance3">Distance (km)</label>
                      <input
                        id="distance3"
                        type="number"
                        placeholder="e.g., 2.0"
                        value={formData.distance3 || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, distance3: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="landmark4">Nearby Landmark 4</label>
                      <input
                        id="landmark4"
                        type="text"
                        placeholder="e.g., Anna University"
                        value={formData.landmark4 || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, landmark4: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="distance4">Distance (km)</label>
                      <input
                        id="distance4"
                        type="number"
                        placeholder="e.g., 3.5"
                        value={formData.distance4 || ''}
                        onChange={(e) => setFormData(fd => ({ ...fd, distance4: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Step 6: Media Uploads */}
                  <div className="form-step-content" data-step="6">
                    <div className="form-group">
                      <label>Main Property Photo *</label>
                      <div className="upload-area" id="main-photo-upload-area">
                        <p>Drag & drop main photo here or click to select</p>
                        <input
                          type="file"
                          id="main-photo-upload"
                          ref={mainFileRef}
                          accept=".jpg,.jpeg,.png"
                          required
                          onChange={handleMainFileChange}
                        />
                        <div className="photo-preview" id="main-photo-preview">
                          {previewMainImg ? (
                            <img src={previewMainImg} alt="Main Photo Preview" />
                          ) : (
                            <img src="https://via.placeholder.com/400x300?text=Main+Photo" alt="Main Photo" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Additional Photos (4‑6)</label>
                      <div className="upload-area" id="additional-photos-upload-area">
                        <p>Drag & drop photos here or click to select</p>
                        <input
                          type="file"
                          id="additional-photos-upload"
                          ref={additionalFileRef}
                          multiple
                          accept=".jpg,.jpeg,.png"
                          onChange={handleAdditionalFileChange}
                        />
                        <div className="photos-preview" id="additional-photos-preview">
                          {additionalFileRef.current?.files
                            ? Array.from(additionalFileRef.current.files).map((f, i) => (
                                <img
                                  key={i}
                                  src={URL.createObjectURL(f)}
                                  alt={f.name}
                                />
                              ))
                            : <p>No photos selected</p>
                          }
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Optional Location/Street View Photo</label>
                      <div className="upload-area" id="street-view-upload-area">
                        <p>Drag & drop photo here or click to select</p>
                        <input
                          type="file"
                          id="street-view-upload"
                          ref={streetFileRef}
                          accept=".jpg,.jpeg,.png"
                          onChange={handleStreetFileChange}
                        />
                        <div className="photo-preview" id="street-view-preview">
                          {streetFileRef.current?.files?.[0] ? (
                            <img
                              src={URL.createObjectURL(streetFileRef.current.files[0])}
                              alt="Street View"
                            />
                          ) : (
                            <p>No photo selected</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Optional Site Plan / Dimension Drawing</label>
                      <div className="upload-area" id="site-plan-upload-area">
                        <p>Drag & drop file here or click to select</p>
                        <input
                          type="file"
                          id="site-plan-upload"
                          ref={siteFileRef}
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleSiteFileChange}
                        />
                        <div className="photo-preview" id="site-plan-preview">
                          {siteFileRef.current?.files?.[0] ? (
                            <img
                              src={URL.createObjectURL(siteFileRef.current.files[0])}
                              alt="Site Plan"
                            />
                          ) : (
                            <p>No file selected</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Property Preview Panel */}
                <div className="property-preview-panel">
                  <h3>Property Preview</h3>
                  <div className="preview-main-photo" id="preview-main-photo">
                    {previewMainImg ? (
                      <img src={previewMainImg} alt="Main Photo Preview" />
                    ) : (
                      <img src="https://via.placeholder.com/400x300?text=Main+Photo" alt="Main Photo" />
                    )}
                  </div>
                  <div className="preview-details">
                    <h4 id="preview-title">
                      {formData.propertyTitle || 'Property Title'}
                    </h4>
                    <p>
                      <span className="preview-label">ID:</span>
                      <span id="preview-id">
                        {formData.propertyId || 'RB-PROP-001'}
                      </span>
                    </p>
                    <p>
                      <span className="preview-label">Type:</span>
                      <span id="preview-type">
                        {formData.propertyType || 'House'}
                      </span>
                    </p>
                    <p>
                      <span className="preview-label">Location:</span>
                      <span id="preview-location">
                        {formData.location || 'Location'}
                      </span>
                    </p>
                    <p>
                      <span className="preview-label">Price:</span>
                      <span id="preview-price">
                        {formData.askingPrice
                          ? `₹ ${formatNumber(Number(formData.askingPrice))}`
                          : '₹ 0'}
                      </span>
                    </p>
                    <p>
                      <span className="preview-label">Area:</span>
                      <span id="preview-area">
                        {formData.totalArea
                          ? `${formatNumber(Number(formData.totalArea))} Sq.Ft`
                          : '0 Sq.Ft'}
                      </span>
                    </p>
                    <p>
                      <span className="preview-label">Bedrooms:</span>
                      <span id="preview-bedrooms">
                        {formData.bedrooms || '0'}
                      </span>
                    </p>
                    <p>
                      <span className="preview-label">Bathrooms:</span>
                      <span id="preview-bathrooms">
                        {formData.bathrooms || '0'}
                      </span>
                    </p>
                    <div className="preview-selling-points">
                      <h5>Selling Points</h5>
                      <ul id="preview-selling-points-list">
                        {sellingPoints.length > 0 ? (
                          sellingPoints.map((pt, idx) => (
                            <li key={idx}>{pt}</li>
                          ))
                        ) : (
                          <li style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                            No selling points added
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form actions */}
              <div className="form-actions">
                <button className="btn-secondary" onClick={goPrev}>
                  Previous Step
                </button>
                <button
                  className={`${currentStep < totalSteps ? 'btn-primary' : 'btn-success'}`}
                  onClick={goNext}
                >
                  {currentStep < totalSteps ? 'Next Step' : 'Submit'}
                </button>
                <button className="btn-outline" onClick={() => {/* Save as Draft */}}>
                  Save as Draft
                </button>
                <button className="btn-outline" onClick={() => {/* Preview Listing */}}>
                  Preview Listing
                </button>
                <button className="btn-danger" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}