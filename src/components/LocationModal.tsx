import { Briefcase, Check, Home, MapPin, Plus, X } from "lucide-react";
import { useState } from "react";
import type { DeliveryAddress } from "../domain/delivery";
import { useDelivery } from "../hooks/useDeliveryState";

export function LocationModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { location, setLocation, addresses, addAddress } = useDelivery();
  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState<"Home" | "Work" | "Other">("Home");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [pincode, setPincode] = useState("560038");

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street.trim()) return;
    addAddress({
      label,
      street: street.trim(),
      landmark: landmark.trim() || undefined,
      city: city.trim(),
      pincode: pincode.trim(),
      isDefault: false
    });
    setIsAdding(false);
    setStreet("");
    setLandmark("");
  };

  const getIcon = (type: DeliveryAddress["label"]) => {
    if (type === "Home") return <Home size={18} />;
    if (type === "Work") return <Briefcase size={18} />;
    return <MapPin size={18} />;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Select Delivery Location</h2>
            <p>Choose where you would like your food delivered</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {!isAdding ? (
          <>
            <div className="address-list">
              {addresses.map(addr => {
                const isSelected = addr.id === location.id;
                return (
                  <div
                    key={addr.id}
                    className={`address-card ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setLocation(addr);
                      onClose();
                    }}
                  >
                    <span className="addr-icon">{getIcon(addr.label)}</span>
                    <div className="addr-body">
                      <b>{addr.label}</b>
                      <p>{addr.street}</p>
                      {addr.landmark && <small>Near {addr.landmark}</small>}
                      <small>
                        {addr.city} — {addr.pincode}
                      </small>
                    </div>
                    {isSelected && (
                      <span className="addr-check">
                        <Check size={18} />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              className="secondary new-addr-btn"
              onClick={() => setIsAdding(true)}
            >
              <Plus size={18} />
              Add New Address
            </button>
          </>
        ) : (
          <form className="add-address-form" onSubmit={handleSave}>
            <div className="tag-group">
              {(["Home", "Work", "Other"] as const).map(type => (
                <button
                  type="button"
                  key={type}
                  className={`type-pill ${label === type ? "active" : ""}`}
                  onClick={() => setLabel(type)}
                >
                  {getIcon(type)}
                  {type}
                </button>
              ))}
            </div>

            <div className="form-group">
              <label>Complete House / Flat & Street Address *</label>
              <input
                required
                value={street}
                onChange={e => setStreet(e.target.value)}
                placeholder="e.g. Flat 301, Marvel Apartments, 5th Cross"
              />
            </div>

            <div className="form-group">
              <label>Landmark (Optional)</label>
              <input
                value={landmark}
                onChange={e => setLandmark(e.target.value)}
                placeholder="e.g. Near Indiranagar Metro Station"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input
                  required
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary"
                onClick={() => setIsAdding(false)}
              >
                Back
              </button>
              <button type="submit" className="primary">
                Save & Deliver Here
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
