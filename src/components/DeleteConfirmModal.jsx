import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, itemName, message }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      backgroundColor: 'rgba(5, 12, 26, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      animation: 'rnsFadeIn 0.2s ease-out'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '440px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.25), 0 0 0 1px rgba(239, 68, 68, 0.1)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'rnsScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        
        {/* Top Decorative Header Accent */}
        <div style={{
          height: '6px',
          background: 'linear-gradient(90deg, #ef4444, #f59e0b, #ef4444)'
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: '#f1f5f9',
            border: 'none',
            color: '#64748b',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#fee2e2';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
            e.currentTarget.style.color = '#64748b';
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Body */}
        <div style={{ padding: '32px 28px 24px 28px', textAlign: 'center' }}>
          
          {/* Animated Red Trash Icon Ring */}
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#fef2f2',
            border: '2px solid #fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            color: '#ef4444',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.15)'
          }}>
            <Trash2 size={30} />
          </div>

          <h3 style={{
            fontSize: '20px',
            fontWeight: 800,
            color: '#091b36',
            marginBottom: '8px',
            fontFamily: 'var(--font-sans)'
          }}>
            {title || 'Confirm Permanent Deletion'}
          </h3>

          {itemName && (
            <div style={{
              display: 'inline-block',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#334155',
              marginBottom: '14px',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              "{itemName}"
            </div>
          )}

          <p style={{
            fontSize: '13px',
            color: '#64748b',
            lineHeight: 1.6,
            marginBottom: '24px'
          }}>
            {message || 'Are you sure you want to delete this item? This action cannot be undone and will permanently remove it from the database.'}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px 20px',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e2e8f0';
                e.currentTarget.style.color = '#0f172a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
                e.currentTarget.style.color = '#475569';
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              style={{
                flex: 1,
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
              }}
            >
              <Trash2 size={16} /> Yes, Delete
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
