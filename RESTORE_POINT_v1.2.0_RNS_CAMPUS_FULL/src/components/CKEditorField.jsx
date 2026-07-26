import React, { useEffect, useRef, useState } from 'react';

export default function CKEditorField({ value, onChange, placeholder, minHeight = '220px' }) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const isUpdatingRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(!!window.ClassicEditor);

  // Load CKEditor 5 Classic CDN Script dynamically if not present
  useEffect(() => {
    if (window.ClassicEditor) {
      setIsLoaded(true);
      return;
    }

    const existingScript = document.getElementById('ckeditor5-cdn-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'ckeditor5-cdn-script';
      script.src = 'https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js';
      script.async = true;
      script.onload = () => {
        setIsLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load CKEditor 5 script');
      };
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener('load', () => setIsLoaded(true));
    }
  }, []);

  // Initialize CKEditor on container when script is loaded
  useEffect(() => {
    if (!isLoaded || !containerRef.current || editorRef.current) return;

    let mounted = true;

    window.ClassicEditor
      .create(containerRef.current, {
        placeholder: placeholder || 'Type or paste content here...',
        toolbar: [
          'heading', '|',
          'bold', 'italic', 'underline', 'strikethrough', '|',
          'bulletedList', 'numberedList', 'blockQuote', '|',
          'link', 'undo', 'redo'
        ]
      })
      .then(editor => {
        if (!mounted) {
          editor.destroy();
          return;
        }

        editorRef.current = editor;

        // Set initial data
        if (value) {
          editor.setData(value);
        }

        // Listen for content changes
        editor.model.document.on('change:data', () => {
          if (isUpdatingRef.current) return;
          const data = editor.getData();
          if (onChange) {
            onChange(data);
          }
        });

        // Customize editor min-height
        const editingArea = editor.ui.view.element.querySelector('.ck-editor__editable');
        if (editingArea) {
          editingArea.style.minHeight = minHeight;
          editingArea.style.fontSize = '14px';
          editingArea.style.lineHeight = '1.6';
          editingArea.style.color = '#334155';
        }
      })
      .catch(err => {
        console.error('Error initializing CKEditor 5:', err);
      });

    return () => {
      mounted = false;
      if (editorRef.current) {
        editorRef.current.destroy().catch(() => {});
        editorRef.current = null;
      }
    };
  }, [isLoaded]);

  // Sync value when prop changes from outside (e.g. modal edit opens)
  useEffect(() => {
    if (editorRef.current) {
      const currentEditorData = editorRef.current.getData();
      if (value !== currentEditorData) {
        isUpdatingRef.current = true;
        editorRef.current.setData(value || '');
        isUpdatingRef.current = false;
      }
    }
  }, [value]);

  return (
    <div className="rns-ckeditor-wrapper" style={{ width: '100%' }}>
      {!isLoaded && (
        <div style={{
          padding: '20px',
          backgroundColor: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          color: '#64748b',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>⏳ Loading CKEditor 5 Rich Text Editor...</span>
        </div>
      )}
      <div 
        ref={containerRef} 
        style={{ display: isLoaded ? 'block' : 'none', width: '100%' }} 
      />
    </div>
  );
}
