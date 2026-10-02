import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  MenuItem,
  Restaurant,
  SelectedCustomization
} from "../domain/delivery";
import { useDelivery } from "../hooks/useDeliveryState";

export function CustomizationModal({
  item,
  restaurant,
  isOpen,
  onClose
}: {
  item: MenuItem | null;
  restaurant: Restaurant;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { addItem } = useDelivery();

  const initialSelections = useMemo(() => {
    if (!item?.customizationGroups) return [];
    const defaults: SelectedCustomization[] = [];
    item.customizationGroups.forEach(group => {
      if (group.required && group.options.length > 0) {
        defaults.push({
          groupId: group.id,
          groupTitle: group.title,
          optionId: group.options[0].id,
          optionName: group.options[0].name,
          extraPrice: group.options[0].extraPrice
        });
      }
    });
    return defaults;
  }, [item]);

  const [selections, setSelections] = useState<SelectedCustomization[]>(
    initialSelections
  );
  const [instructions, setInstructions] = useState("");

  if (!isOpen || !item || !item.customizationGroups) return null;

  const toggleOption = (
    groupTitle: string,
    groupId: string,
    optionId: string,
    optionName: string,
    extraPrice: number,
    required: boolean
  ) => {
    if (required) {
      // Radio behavior: replace existing for this group
      setSelections(prev => [
        ...prev.filter(s => s.groupId !== groupId),
        { groupId, groupTitle, optionId, optionName, extraPrice }
      ]);
    } else {
      // Checkbox behavior: toggle
      const exists = selections.some(
        s => s.groupId === groupId && s.optionId === optionId
      );
      if (exists) {
        setSelections(prev =>
          prev.filter(
            s => !(s.groupId === groupId && s.optionId === optionId)
          )
        );
      } else {
        setSelections(prev => [
          ...prev,
          { groupId, groupTitle, optionId, optionName, extraPrice }
        ]);
      }
    }
  };

  const extraTotal = selections.reduce((s, o) => s + o.extraPrice, 0);
  const itemTotal = item.price + extraTotal;

  const handleAdd = () => {
    addItem(item, selections, restaurant);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Customise {item.name}</h2>
            <p>Select your favorite sizes, crusts & add-ons</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="customization-groups">
          {item.customizationGroups.map(group => {
            return (
              <div key={group.id} className="custom-group">
                <div className="group-heading">
                  <h3>{group.title}</h3>
                  <small className={group.required ? "req-badge" : "opt-badge"}>
                    {group.required ? "Required" : "Optional"}
                  </small>
                </div>

                <div className="group-options">
                  {group.options.map(option => {
                    const isSelected = selections.some(
                      s =>
                        s.groupId === group.id && s.optionId === option.id
                    );

                    return (
                      <div
                        key={option.id}
                        className={`option-row ${isSelected ? "selected" : ""}`}
                        onClick={() =>
                          toggleOption(
                            group.title,
                            group.id,
                            option.id,
                            option.name,
                            option.extraPrice,
                            group.required
                          )
                        }
                      >
                        <div className="option-select-box">
                          {isSelected && <Check size={14} color="#ffffff" />}
                        </div>
                        <span className="option-name">{option.name}</span>
                        <span className="option-price">
                          {option.extraPrice > 0
                            ? `+ ₹${option.extraPrice}`
                            : "Free"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="form-group" style={{ marginTop: 20 }}>
            <label>Cooking & Packing Instructions</label>
            <input
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              placeholder="e.g. Less spicy, send extra napkins & cutlery…"
            />
          </div>
        </div>

        <div className="custom-footer">
          <div>
            <small>Item Total</small>
            <b>₹{itemTotal}</b>
          </div>
          <button className="primary" onClick={handleAdd}>
            Add Item to Cart • ₹{itemTotal}
          </button>
        </div>
      </div>
    </div>
  );
}
