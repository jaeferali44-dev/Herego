import React, { useState, useEffect, useMemo } from 'react';
import { useWebsiteContent, SiteContent, FeaturedStory } from '../context/WebsiteContentContext';
import { 
  Lock, User, LogOut, Check, Save, Plus, Trash2, Edit3, Image as ImageIcon, Settings, Globe, Compass,
  Palette, Phone, Info, RefreshCw, Upload, FileText, Key, Eye, Sparkles, ChevronDown, ChevronUp, CheckCircle,
  Search, ExternalLink, AlertTriangle, X, RotateCcw, Copy, FolderPlus, Grid, Layers, HelpCircle, Layout, Link as LinkIcon
} from 'lucide-react';
import { Destination, TourPackage, OperationalPillar } from '../types';
import { CONTACT_INFO } from '../data';

// Helper to format Google Drive links & third-party image URLs for direct rendering
export function formatImageUrl(url: string | undefined | null): string {
  if (!url) return '';
  let cleanUrl = url.trim();
  
  // Convert Google Drive view links
  const driveFileMatch = cleanUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }
  
  // Convert Google Drive uc?id=
  const driveUcMatch = cleanUrl.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (driveUcMatch && driveUcMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveUcMatch[1]}`;
  }
  
  return cleanUrl;
}

// Preset owner photos for quick selection in media fields
const PRESET_IMAGES = [
  { name: 'Erta Ale Volcano', url: 'https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc' },
  { name: 'Lake Langano', url: 'https://lh3.googleusercontent.com/d/1F8bLbL2KSswLCM597_0x0Bbf4s_FYszQ' },
  { name: 'Harar Citadel', url: 'https://lh3.googleusercontent.com/d/1XT4E0bnzH8NAerzhh4593m5_iT2z2evn' },
  { name: 'Wenchi Crater', url: 'https://lh3.googleusercontent.com/d/1xYKpCVh4qtLJtg6NAeFsEVXxrDy_Za5R' },
  { name: 'Bale Mountains', url: 'https://lh3.googleusercontent.com/d/1lPneimMnO3ELOjLv-zMcqYX4mBGtJ1IN' },
  { name: 'Mombasa Coast', url: 'https://lh3.googleusercontent.com/d/1A3RpQL7R1gQtAvHlTp1Vj2e_BDpP7rvL' },
  { name: 'Featured Traveler - Abraham', url: 'https://lh3.googleusercontent.com/d/1GudVIwjUPYoASqQI9j9sFr29fsmdoWzj' },
  { name: 'Featured Traveler - Yuti', url: 'https://lh3.googleusercontent.com/d/1LB99SET0Z-YWtGUp8LBALcOXRzFw5z0f' },
];

// Safe Image Component with fallback handling
const SafeImage = ({
  src,
  alt,
  className = '',
  fallbackLabel = 'No Image'
}: {
  src: string | undefined | null;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}) => {
  const [hasError, setHasError] = useState(false);
  const formatted = formatImageUrl(src);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!formatted || hasError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-500 p-2 text-center select-none ${className}`}>
        <ImageIcon className="w-5 h-5 mb-1 opacity-50" />
        <span className="text-[10px] font-mono truncate max-w-full">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={formatted}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
};

// Reusable Expandable Section Panel Component
const ExpandableSection = ({
  title,
  subtitle,
  icon: Icon = Layers,
  defaultExpanded = false,
  badge,
  children
}: {
  title: string;
  subtitle?: string;
  icon?: any;
  defaultExpanded?: boolean;
  badge?: string;
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-zinc-800 rounded-2xl bg-zinc-950/80 overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-zinc-900/60 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 shrink-0">
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-display font-bold text-sm text-zinc-100 truncate">{title}</h4>
              {badge && (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-mono font-medium">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-zinc-400 truncate mt-0.5">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 text-zinc-400 shrink-0">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 hidden sm:inline">
            {isExpanded ? 'Collapse' : 'Expand'}
          </span>
          <div className={`p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 transition-transform ${isExpanded ? 'rotate-180 text-amber-400' : ''}`}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="p-5 sm:p-6 border-t border-zinc-800/80 bg-zinc-950/40 space-y-5 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

// Reusable Image Picker Base Component
const ImagePickerBase = ({
  label,
  value,
  onChange,
  helpText,
  onOpenMediaPicker,
  onInspectImage,
  onUploadImage,
  requestConfirmation
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helpText?: string;
  onOpenMediaPicker: (callback: (url: string) => void) => void;
  onInspectImage: (url: string) => void;
  onUploadImage: (file: File, callback: (url: string) => void) => Promise<void>;
  requestConfirmation?: (
    title: string,
    message: string,
    onConfirm: () => void | Promise<void>,
    isDestructive?: boolean,
    confirmText?: string,
    cancelText?: string
  ) => void;
}) => {
  const [showPresets, setShowPresets] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);
  const [tempLinkValue, setTempLinkValue] = useState(value || '');

  useEffect(() => {
    setTempLinkValue(value || '');
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">{label}</label>
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => {
              setTempLinkValue(value || '');
              setShowAdvancedModal(true);
            }}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-700 hover:border-amber-400/50"
            title="Open comfortable advanced link editor modal with live preview"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Advanced Link Edit</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenMediaPicker(onChange)}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1.5 cursor-pointer bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Media Library</span>
          </button>
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="text-[11px] text-zinc-400 hover:text-zinc-200 font-medium flex items-center gap-1 cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{showPresets ? 'Hide Presets' : 'Presets'}</span>
          </button>
        </div>
      </div>

      {helpText && <p className="text-[11px] text-zinc-400">{helpText}</p>}

      {/* Live Image Preview + Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Thumbnail Box */}
        <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700 shrink-0 group">
          {value ? (
            <>
              <SafeImage src={value} alt={label} className="w-full h-full object-cover" fallbackLabel="Preview" />
              {/* Always Visible Quick Delete Badge */}
              <button
                type="button"
                onClick={() => {
                  if (requestConfirmation) {
                    requestConfirmation(
                      'Clear Image Link?',
                      `Are you sure you want to clear the image link for "${label}"?`,
                      () => onChange(''),
                      true,
                      'Clear',
                      'Cancel'
                    );
                  } else {
                    onChange('');
                  }
                }}
                className="absolute top-1 right-1 z-20 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md shadow-lg cursor-pointer transition-transform active:scale-95"
                title="Delete Image"
              >
                <Trash2 className="w-3 h-3" />
              </button>

              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 transition-opacity p-1">
                <button
                  type="button"
                  onClick={() => onInspectImage(formatImageUrl(value))}
                  className="p-1.5 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors cursor-pointer"
                  title="Inspect Image"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (requestConfirmation) {
                      requestConfirmation(
                        'Clear Image Link?',
                        `Are you sure you want to clear the image link for "${label}"?`,
                        () => onChange(''),
                        true,
                        'Clear',
                        'Cancel'
                      );
                    } else {
                      onChange('');
                    }
                  }}
                  className="p-1.5 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors cursor-pointer"
                  title="Delete Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 text-[10px] p-2 text-center">
              <ImageIcon className="w-5 h-5 mb-1 opacity-50" />
              <span>No Image</span>
            </div>
          )}
        </div>

        {/* Input, Upload & Delete Button */}
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="https://lh3.googleusercontent.com/d/... or /uploads/..."
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-700 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50"
          />
          <label className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl cursor-pointer transition-all flex items-center justify-center shrink-0 text-amber-400 font-medium text-xs gap-1.5">
            {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span className="hidden sm:inline">Upload</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setIsUploading(true);
                await onUploadImage(file, onChange);
                setIsUploading(false);
              }}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => {
                if (requestConfirmation) {
                  requestConfirmation(
                    'Clear Image Link?',
                    `Are you sure you want to clear the image link for "${label}"?`,
                    () => onChange(''),
                    true,
                    'Clear',
                    'Cancel'
                  );
                } else {
                  onChange('');
                }
              }}
              className="px-3.5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all flex items-center justify-center shrink-0 text-xs gap-1.5 cursor-pointer shadow-md"
              title="Delete Image"
            >
              <Trash2 className="w-4 h-4" />
              <span className="inline">Delete</span>
            </button>
          )}
        </div>
      </div>

      {/* Preset Gallery Picker */}
      {showPresets && (
        <div className="p-3 bg-zinc-900 border border-amber-400/30 rounded-xl space-y-2 mt-2 animate-fade-in">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Select Preset Photo</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_IMAGES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(item.url);
                  setShowPresets(false);
                }}
                className="group relative h-16 rounded-lg overflow-hidden border border-zinc-700 hover:border-amber-400 text-left transition-all cursor-pointer"
              >
                <SafeImage src={item.url} alt={item.name} className="w-full h-full group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-1.5 flex items-end">
                  <span className="text-[10px] font-bold text-white truncate">{item.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Image Link Editor Modal */}
      {showAdvancedModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-xl w-full bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-display font-bold text-base text-amber-400 flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                <span>Advanced Link Editor: {label}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAdvancedModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-1.5">
                  Paste or Edit Long Image Link / URL
                </label>
                <textarea
                  rows={4}
                  value={tempLinkValue}
                  onChange={(e) => setTempLinkValue(e.target.value)}
                  placeholder="Paste long URL, Google Drive share link, or asset path here..."
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const formatted = formatImageUrl(tempLinkValue);
                    setTempLinkValue(formatted);
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium underline cursor-pointer"
                >
                  Format Google Drive / Direct URL
                </button>
                <button
                  type="button"
                  onClick={() => setTempLinkValue('')}
                  className="text-xs text-zinc-400 hover:text-red-400 font-medium cursor-pointer"
                >
                  Clear Link
                </button>
              </div>

              {/* Live Preview in Modal */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">Live Preview Check</label>
                <div className="h-44 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center relative">
                  <SafeImage src={tempLinkValue} alt="Preview" className="max-h-full max-w-full object-contain" fallbackLabel="Invalid or Empty Image Link" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setShowAdvancedModal(false)}
                className="px-4 py-2.5 bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange(tempLinkValue.trim());
                  setShowAdvancedModal(false);
                }}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Link & Apply</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Gallery List Editor Base
const GalleryEditorBase = ({
  label = 'Image Gallery Collection',
  images = [],
  onChange,
  onOpenMediaPicker,
  onInspectImage,
  onUploadImage,
  requestConfirmation
}: {
  label?: string;
  images?: string[];
  onChange: (updated: string[]) => void;
  onOpenMediaPicker: (callback: (url: string) => void) => void;
  onInspectImage: (url: string) => void;
  onUploadImage?: (file: File, callback: (url: string) => void) => Promise<void>;
  requestConfirmation?: (
    title: string,
    message: string,
    onConfirm: () => void | Promise<void>,
    isDestructive?: boolean,
    confirmText?: string,
    cancelText?: string
  ) => void;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');

  // Bulk Link Uploader Modal state
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkLinkText, setBulkLinkText] = useState('');

  // Single Image Editing & Adding state
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [singleEditUrl, setSingleEditUrl] = useState('');
  const [showSingleAddModal, setShowSingleAddModal] = useState(false);
  const [singleAddUrl, setSingleAddUrl] = useState('');

  const handleBulkUploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0 || !onUploadImage) return;

    setIsUploading(true);
    const newUploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      setUploadProgressText(`Uploading image ${i + 1} of ${files.length}...`);
      await onUploadImage(files[i], (url) => {
        if (url) newUploadedUrls.push(url);
      });
    }

    if (newUploadedUrls.length > 0) {
      onChange([...images, ...newUploadedUrls]);
    }

    setIsUploading(false);
    setUploadProgressText('');
    e.target.value = '';
  };

  const handleApplyBulkLinks = (appendMode: boolean) => {
    if (!bulkLinkText.trim()) return;

    const rawLines = bulkLinkText
      .split(/[\n,]+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const formattedUrls = rawLines.map((url) => formatImageUrl(url)).filter(Boolean);

    if (formattedUrls.length > 0) {
      if (appendMode) {
        onChange([...images, ...formattedUrls]);
      } else {
        onChange(formattedUrls);
      }
    }

    setShowBulkModal(false);
    setBulkLinkText('');
  };

  const handleFormatBulkLinksInTextarea = () => {
    if (!bulkLinkText.trim()) return;
    const lines = bulkLinkText.split('\n');
    const formatted = lines.map((line) => {
      const trimmed = line.trim();
      return trimmed ? formatImageUrl(trimmed) : '';
    }).join('\n');
    setBulkLinkText(formatted);
  };

  const parsedBulkUrls = useMemo(() => {
    if (!bulkLinkText.trim()) return [];
    return bulkLinkText
      .split(/[\n,]+/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((url) => formatImageUrl(url));
  }, [bulkLinkText]);

  return (
    <div className="space-y-3 p-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block">{label}</label>
          <span className="text-[11px] text-zinc-400">
            {images.length} {images.length === 1 ? 'image' : 'images'} in section collection
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {images.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (requestConfirmation) {
                  requestConfirmation(
                    'Delete All Gallery Images?',
                    `Are you sure you want to delete all ${images.length} images from the "${label}" gallery?`,
                    () => onChange([]),
                    true,
                    'Delete All',
                    'Cancel'
                  );
                } else {
                  onChange([]);
                }
              }}
              className="text-xs px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
              title="Delete all images in gallery"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete All</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowBulkModal(true)}
            className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-700 hover:border-amber-400/50 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer"
            title="Paste multiple image links or Google Drive URLs at once"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Bulk Links Uploader</span>
          </button>

          {onUploadImage && (
            <label className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer">
              {isUploading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{isUploading ? 'Uploading...' : 'Bulk Upload Files'}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                disabled={isUploading}
                onChange={handleBulkUploadFiles}
              />
            </label>
          )}

          <button
            type="button"
            onClick={() => {
              setSingleAddUrl('');
              setShowSingleAddModal(true);
            }}
            className="text-xs px-3 py-1.5 bg-amber-400 text-zinc-950 font-bold rounded-lg flex items-center gap-1.5 hover:bg-amber-300 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Single Image</span>
          </button>
        </div>
      </div>

      {isUploading && uploadProgressText && (
        <div className="px-3 py-2 bg-amber-400/10 border border-amber-400/30 rounded-xl text-xs text-amber-300 flex items-center gap-2 animate-pulse">
          <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
          <span>{uploadProgressText}</span>
        </div>
      )}

      {/* Gallery Cards Grid */}
      {images.length === 0 ? (
        <div className="p-6 border border-dashed border-zinc-800 rounded-xl text-center space-y-2">
          <ImageIcon className="w-8 h-8 mx-auto text-zinc-600" />
          <p className="text-xs text-zinc-400 font-medium">No gallery images added yet for this section.</p>
          <p className="text-[11px] text-zinc-500">Use "Bulk Links Uploader" to paste image URLs, "Bulk Upload Files" to select multiple photos from your computer, or "Add Single Image".</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((imgUrl, idx) => (
            <div key={idx} className="relative group rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
              <div className="h-28 relative overflow-hidden bg-zinc-900">
                <SafeImage src={imgUrl} alt={`Gallery item ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />

                {/* Always-visible top-right Trash Badge */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (requestConfirmation) {
                      requestConfirmation(
                        'Remove Image from Gallery?',
                        'Are you sure you want to remove this image from the gallery collection?',
                        () => {
                          const updated = images.filter((_, i) => i !== idx);
                          onChange(updated);
                        },
                        true,
                        'Remove',
                        'Cancel'
                      );
                    } else {
                      const updated = images.filter((_, i) => i !== idx);
                      onChange(updated);
                    }
                  }}
                  className="absolute top-1.5 right-1.5 z-20 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white p-1.5 rounded-lg shadow-lg cursor-pointer transition-transform flex items-center justify-center"
                  title="Delete Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 transition-opacity p-2 z-10">
                  <button
                    type="button"
                    onClick={() => onInspectImage(formatImageUrl(imgUrl))}
                    className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors cursor-pointer"
                    title="Zoom / Inspect"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingIdx(idx);
                      setSingleEditUrl(imgUrl);
                    }}
                    className="p-1.5 bg-amber-400 text-zinc-950 hover:bg-amber-300 font-bold rounded-lg transition-colors cursor-pointer"
                    title="Edit Image Link"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onOpenMediaPicker((newUrl) => {
                        const updated = [...images];
                        updated[idx] = newUrl;
                        onChange(updated);
                      });
                    }}
                    className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-400 rounded-lg transition-colors cursor-pointer"
                    title="Replace Image from Media Library"
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (requestConfirmation) {
                        requestConfirmation(
                          'Remove Image from Gallery?',
                          'Are you sure you want to remove this image from the gallery collection?',
                          () => {
                            const updated = images.filter((_, i) => i !== idx);
                            onChange(updated);
                          },
                          true,
                          'Remove',
                          'Cancel'
                        );
                      } else {
                        const updated = images.filter((_, i) => i !== idx);
                        onChange(updated);
                      }
                    }}
                    className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors cursor-pointer"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-2 bg-zinc-900/90 border-t border-zinc-800/80 flex items-center justify-between text-[11px] gap-1">
                <span className="font-mono text-zinc-400 truncate flex-1" title={imgUrl}>
                  {imgUrl.split('/').pop() || `Image #${idx + 1}`}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingIdx(idx);
                      setSingleEditUrl(imgUrl);
                    }}
                    className="px-2 py-0.5 bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-zinc-950 font-bold rounded text-[10px] cursor-pointer transition-colors"
                    title="Edit Image Link"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (requestConfirmation) {
                        requestConfirmation(
                          'Remove Image from Gallery?',
                          'Are you sure you want to remove this image from the gallery collection?',
                          () => {
                            const updated = images.filter((_, i) => i !== idx);
                            onChange(updated);
                          },
                          true,
                          'Remove',
                          'Cancel'
                        );
                      } else {
                        const updated = images.filter((_, i) => i !== idx);
                        onChange(updated);
                      }
                    }}
                    className="px-2 py-0.5 bg-rose-600 text-white hover:bg-rose-700 font-bold rounded text-[10px] cursor-pointer transition-colors flex items-center gap-1 shadow-sm"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal 1: Bulk Image Links Uploader */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-2xl w-full bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 shrink-0">
              <h3 className="font-display font-bold text-base text-amber-400 flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                <span>Bulk Image Link Uploader ({label})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              <p className="text-xs text-zinc-300">
                Paste multiple image links or Google Drive share URLs below (one URL per line or separated by commas). You can add unlimited photos in bulk to this section!
              </p>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Paste Image URLs / Links
                </label>
                <textarea
                  rows={6}
                  value={bulkLinkText}
                  onChange={(e) => setBulkLinkText(e.target.value)}
                  placeholder={`https://lh3.googleusercontent.com/d/1...\nhttps://images.unsplash.com/photo-1...\nhttps://example.com/image.jpg`}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleFormatBulkLinksInTextarea}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium underline cursor-pointer"
                >
                  Format Google Drive / Direct Links
                </button>
                <span className="text-xs text-zinc-400">
                  Detected {parsedBulkUrls.length} valid image {parsedBulkUrls.length === 1 ? 'link' : 'links'}
                </span>
              </div>

              {parsedBulkUrls.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                    Parsed Links Live Preview ({parsedBulkUrls.length})
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                    {parsedBulkUrls.map((url, i) => (
                      <div key={i} className="h-16 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 relative">
                        <SafeImage src={url} alt={`Parsed link ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2.5 bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleApplyBulkLinks(false)}
                disabled={parsedBulkUrls.length === 0}
                className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-bold text-xs uppercase rounded-xl cursor-pointer disabled:opacity-50"
              >
                Replace Gallery ({parsedBulkUrls.length})
              </button>
              <button
                type="button"
                onClick={() => handleApplyBulkLinks(true)}
                disabled={parsedBulkUrls.length === 0}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Append to Gallery ({parsedBulkUrls.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Single Image Link Direct Editor */}
      {editingIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-lg w-full bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-display font-bold text-base text-amber-400 flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                <span>Edit Image #{editingIdx + 1} Link</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingIdx(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                  Image URL / Link
                </label>
                <textarea
                  rows={3}
                  value={singleEditUrl}
                  onChange={(e) => setSingleEditUrl(e.target.value)}
                  placeholder="Paste long URL or Google Drive link..."
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSingleEditUrl(formatImageUrl(singleEditUrl))}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium underline cursor-pointer"
                >
                  Format Google Drive Link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenMediaPicker((newUrl) => {
                      setSingleEditUrl(newUrl);
                    });
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer flex items-center gap-1"
                >
                  <Grid className="w-3 h-3" />
                  <span>Choose from Media Library</span>
                </button>
              </div>

              <div className="h-36 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center p-2">
                <SafeImage src={singleEditUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setEditingIdx(null)}
                className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated = [...images];
                  updated[editingIdx] = singleEditUrl.trim();
                  onChange(updated);
                  setEditingIdx(null);
                }}
                className="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase rounded-xl shadow-md cursor-pointer flex items-center gap-1"
              >
                <Check className="w-4 h-4" />
                <span>Save Image Link</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Add Single Image to Gallery Modal */}
      {showSingleAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-lg w-full bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-display font-bold text-base text-amber-400 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Add Photo to Gallery ({label})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowSingleAddModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                  Option A: Paste Image Link or Google Drive Share URL
                </label>
                <textarea
                  rows={3}
                  value={singleAddUrl}
                  onChange={(e) => setSingleAddUrl(e.target.value)}
                  placeholder="Paste image link, Google Drive URL, or web photo link here..."
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 font-mono focus:outline-none focus:border-amber-400"
                />
                <div className="flex items-center justify-between mt-1.5">
                  <button
                    type="button"
                    onClick={() => setSingleAddUrl(formatImageUrl(singleAddUrl))}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium underline cursor-pointer"
                  >
                    Format Google Drive Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setSingleAddUrl('')}
                    className="text-xs text-zinc-400 hover:text-red-400 font-medium cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Live Preview */}
              {singleAddUrl.trim() && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase text-zinc-400 block">Live Preview</label>
                  <div className="h-32 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center">
                    <SafeImage src={singleAddUrl} alt="Preview" className="max-h-full max-w-full object-contain" fallbackLabel="Invalid Image Link" />
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-zinc-800 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSingleAddModal(false);
                    onOpenMediaPicker((selectedUrl: string) => {
                      onChange([...images, selectedUrl]);
                    });
                  }}
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Option B: Media Library</span>
                </button>

                {onUploadImage && (
                  <label className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Option C: Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIsUploading(true);
                        await onUploadImage(file, (url) => {
                          onChange([...images, url]);
                        });
                        setIsUploading(false);
                        setShowSingleAddModal(false);
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setShowSingleAddModal(false)}
                className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!singleAddUrl.trim()}
                onClick={() => {
                  const formatted = formatImageUrl(singleAddUrl.trim());
                  if (formatted) {
                    onChange([...images, formatted]);
                    setShowSingleAddModal(false);
                    setSingleAddUrl('');
                  }
                }}
                className="px-6 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-zinc-950 font-bold text-xs uppercase rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Add Link to Gallery</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Bullet List Editor
const ListEditor = ({
  label,
  items = [],
  placeholder = 'Add new point...',
  onChange
}: {
  label: string;
  items?: string[];
  placeholder?: string;
  onChange: (items: string[]) => void;
}) => {
  const [newItemText, setNewItemText] = useState('');

  const addItem = () => {
    if (!newItemText.trim()) return;
    onChange([...items, newItemText.trim()]);
    setNewItemText('');
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">{label}</label>
      
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const copy = [...items];
                copy[idx] = e.target.value;
                onChange(copy);
              }}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
            />
            <button
              type="button"
              onClick={() => {
                const copy = items.filter((_, i) => i !== idx);
                onChange(copy);
              }}
              className="p-2.5 bg-zinc-900 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-300 border border-zinc-800 rounded-xl shrink-0 cursor-pointer"
              title="Remove Item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            placeholder={placeholder}
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addItem();
              }
            }}
            className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs rounded-xl shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Save Bar Base Component
const TabSaveBarBase = ({
  hasUnsavedChanges,
  saveStatus,
  onSave,
  onDiscard
}: {
  hasUnsavedChanges: boolean;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  onSave: () => void;
  onDiscard: () => void;
}) => (
  <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800">
    <div className="flex items-center gap-3">
      {hasUnsavedChanges ? (
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Unsaved local modifications pending publication</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-zinc-400 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>All tab fields in sync with storage</span>
        </div>
      )}
    </div>

    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDiscard}
        disabled={!hasUnsavedChanges}
        className="px-4 py-2.5 bg-zinc-850 hover:bg-zinc-800 disabled:hover:bg-transparent text-zinc-300 disabled:text-zinc-600 border border-zinc-800 disabled:border-zinc-800/30 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Discard Changes</span>
      </button>

      <button
        type="button"
        onClick={onSave}
        disabled={saveStatus === 'saving'}
        className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {saveStatus === 'saving' ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        <span>Save Changes</span>
      </button>
    </div>
  </div>
);

export default function PageAdmin() {
  const {
    content,
    loading,
    isAdminAuthenticated,
    adminUser,
    adminUsersList,
    error,
    updateContent,
    uploadImage,
    deleteMediaFile,
    login,
    logout,
    createAdminUser,
    updateAdminUser,
    deleteAdminUser,
    fetchAdminUsers
  } = useWebsiteContent();

  // Authentication states
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'hero-about' | 'destinations' | 'packages' | 'stories' | 'media' | 'contact-seo' | 'design' | 'accounts'
  >('hero-about');

  // Local form content copy
  const [localContent, setLocalContent] = useState<SiteContent | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  // Uploaded media files state from backend
  const [uploadedMedia, setUploadedMedia] = useState<{ name: string; url: string; size: number; mtime: string }[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaTabInputUrl, setMediaTabInputUrl] = useState('');

  // Search & Filter queries
  const [destSearch, setDestSearch] = useState('');
  const [pkgSearch, setPkgSearch] = useState('');
  const [storySearch, setStorySearch] = useState('');

  // Editing state placeholders
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);
  const [selectedPkgId, setSelectedPkgId] = useState<string | null>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);

  // Image preview modal state
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  
  // Media Picker Modal State
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerCallback, setMediaPickerCallback] = useState<((url: string) => void) | null>(null);
  const [pickerDirectUrl, setPickerDirectUrl] = useState('');
  const [pickerSearch, setPickerSearch] = useState('');
  const [pickerUploading, setPickerUploading] = useState(false);

  // Clipboard feedback state
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Admin users state placeholders
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [editAdminId, setEditAdminId] = useState<string | null>(null);
  const [editAdminUsername, setEditAdminUsername] = useState('');
  const [editAdminPassword, setEditAdminPassword] = useState('');
  const [editAdminEnabled, setEditAdminEnabled] = useState<boolean>(true);

  // Custom confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void | Promise<void>;
    isDestructive?: boolean;
    confirmText?: string;
    cancelText?: string;
  } | null>(null);

  // Custom toast notification state
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const requestConfirmation = (
    title: string,
    message: string,
    onConfirm: () => void | Promise<void>,
    isDestructive: boolean = false,
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel'
  ) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm: async () => {
        try {
          await onConfirm();
        } catch (err) {
          console.error('Error during confirmed action:', err);
        } finally {
          setConfirmDialog(null);
        }
      },
      isDestructive,
      confirmText,
      cancelText
    });
  };

  // Auto-clear toast with timer
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Synchronize local form copy when server content loads
  useEffect(() => {
    if (content) {
      setLocalContent(JSON.parse(JSON.stringify(content)));
    }
  }, [content]);

  // Fetch media library files from backend
  const fetchMediaLibrary = async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        setUploadedMedia(data);
      }
    } catch (err) {
      console.error('Failed to fetch media list:', err);
    } finally {
      setLoadingMedia(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchMediaLibrary();
    }
  }, [isAdminAuthenticated]);

  useEffect(() => {
    if (isAdminAuthenticated && activeTab === 'accounts') {
      fetchAdminUsers();
    }
  }, [isAdminAuthenticated, activeTab]);

  // Index all unique website images across the content structure (excluding unneeded stock presets)
  const allIndexedWebsiteImages = useMemo(() => {
    if (!localContent) return [];
    const set = new Set<string>();

    if (localContent.mediaGallery) {
      localContent.mediaGallery.forEach(img => img && set.add(img));
    }

    if (localContent.hero?.bgImage) set.add(localContent.hero.bgImage);
    
    localContent.destinations?.forEach(d => {
      if (d.imageUrl) set.add(d.imageUrl);
      if (d.gallery) d.gallery.forEach(img => img && set.add(img));
    });

    localContent.tourPackages?.forEach(p => {
      if (p.imageUrl) set.add(p.imageUrl);
      if (p.gallery) p.gallery.forEach(img => img && set.add(img));
      if (p.exploreJourney) {
        p.exploreJourney.forEach(loc => {
          if (loc.images) loc.images.forEach(img => img && set.add(img));
        });
      }
    });

    localContent.featuredStories?.forEach(s => {
      if (s.imageUrl) set.add(s.imageUrl);
    });

    localContent.about?.pillars?.forEach(pil => {
      if (pil.imageUrl) set.add(pil.imageUrl);
    });

    localContent.videoCollaborations?.forEach(v => {
      if (v.thumbnailUrl) set.add(v.thumbnailUrl);
    });

    // Only include user uploads & actual site images
    uploadedMedia.forEach(m => set.add(m.url));

    return Array.from(set).filter(Boolean);
  }, [localContent, uploadedMedia]);

  // Helper to persist a custom image link / Google Drive URL into media library
  const addLinkToMediaLibrary = async (rawUrl: string): Promise<string | null> => {
    if (!rawUrl || !rawUrl.trim() || !localContent) return null;
    const formatted = formatImageUrl(rawUrl.trim());
    if (!formatted) return null;

    const clone: SiteContent = JSON.parse(JSON.stringify(localContent));
    if (!clone.mediaGallery) clone.mediaGallery = [];
    if (!clone.mediaGallery.some(img => isSameImage(img, formatted))) {
      clone.mediaGallery.unshift(formatted);
    }

    setLocalContent(clone);
    await updateContent(clone);
    return formatted;
  };

  // Check if local content has unsaved changes compared to server context
  const hasUnsavedChanges = useMemo(() => {
    if (!content || !localContent) return false;
    return JSON.stringify(content) !== JSON.stringify(localContent);
  }, [content, localContent]);

  // Helper to compare image URLs regardless of raw vs formatted Google Drive transforms or URL encoding differences
  const isSameImage = (urlA: string | undefined | null, urlB: string | undefined | null): boolean => {
    if (!urlA || !urlB) return false;
    const cleanA = decodeURIComponent(urlA.trim());
    const cleanB = decodeURIComponent(urlB.trim());
    if (!cleanA || !cleanB) return false;
    if (cleanA === cleanB) return true;

    // Check if both are uploaded media with the same filename
    const getUploadFilename = (url: string) => {
      if (url.includes('/uploads/')) {
        return url.split('/uploads/').pop()?.split('?')[0] || '';
      }
      return '';
    };
    const fileA = getUploadFilename(cleanA);
    const fileB = getUploadFilename(cleanB);
    if (fileA && fileB && fileA === fileB) {
      return true;
    }

    const formattedA = formatImageUrl(cleanA);
    const formattedB = formatImageUrl(cleanB);
    return formattedA === formattedB || cleanA === formattedB || formattedA === cleanB;
  };

  // Function to delete a specific image URL from all content fields
  const deleteImageFromAllContent = async (targetUrl: string) => {
    if (!targetUrl || !localContent) return;
    
    let deletionSuccess = true;

    // 1. Delete file from server storage if it's an uploaded media file
    if (targetUrl.includes('/uploads/')) {
      const parts = targetUrl.split('/uploads/');
      let filename = parts[parts.length - 1];
      
      // Strip any query parameters (e.g., cache-busting timestamp ?t=...)
      if (filename.includes('?')) {
        filename = filename.split('?')[0];
      }

      if (filename) {
        try {
          const decodedFilename = decodeURIComponent(filename);
          
          // Verify existence of the image key in local uploadedMedia state before issuing delete command
          const exists = uploadedMedia.some(m => {
            const mDecoded = decodeURIComponent(m.name).split('?')[0];
            return mDecoded === decodedFilename;
          });

          if (exists) {
            const wasDeleted = await deleteMediaFile(decodedFilename);
            if (!wasDeleted) {
              deletionSuccess = false;
              console.error(`[MEDIA DELETE] Server returned failure status when deleting filename: ${decodedFilename}`);
            } else {
              // Optimistically update uploadedMedia list
              setUploadedMedia(prev => prev.filter(m => {
                const mNameDecoded = decodeURIComponent(m.name).split('?')[0];
                return mNameDecoded !== decodedFilename;
              }));
            }
          } else {
            console.warn(`[MEDIA DELETE] Filename ${decodedFilename} not found in uploaded media list, skipping API deletion command.`);
          }
        } catch (err) {
          deletionSuccess = false;
          console.error('Failed to delete uploaded media file:', err);
        }
      }
    }

    // 2. Remove references from all site content fields
    const clone: SiteContent = JSON.parse(JSON.stringify(localContent));

    if (isSameImage(clone.hero?.bgImage, targetUrl)) {
      clone.hero.bgImage = '';
    }

    if (clone.destinations) {
      clone.destinations.forEach((d) => {
        if (isSameImage(d.imageUrl, targetUrl)) d.imageUrl = '';
        if (d.gallery) d.gallery = d.gallery.filter((g) => !isSameImage(g, targetUrl));
      });
    }

    if (clone.tourPackages) {
      clone.tourPackages.forEach((p) => {
        if (isSameImage(p.imageUrl, targetUrl)) p.imageUrl = '';
        if (p.gallery) p.gallery = p.gallery.filter((g) => !isSameImage(g, targetUrl));
      });
    }

    if (clone.featuredStories) {
      clone.featuredStories.forEach((s) => {
        if (isSameImage(s.imageUrl, targetUrl)) s.imageUrl = '';
      });
    }

    if (clone.about?.pillars) {
      clone.about.pillars.forEach((pil) => {
        if (isSameImage(pil.imageUrl, targetUrl)) pil.imageUrl = '';
      });
    }

    if (clone.videoCollaborations) {
      clone.videoCollaborations.forEach((v) => {
        if (isSameImage(v.thumbnailUrl, targetUrl)) v.thumbnailUrl = '';
      });
    }

    if (clone.mediaGallery) {
      clone.mediaGallery = clone.mediaGallery.filter((g) => !isSameImage(g, targetUrl));
    }

    setLocalContent(clone);
    await updateContent(clone);
    await fetchMediaLibrary();

    if (deletionSuccess) {
      showToast('Image deleted and all section references removed successfully!', 'success');
    } else {
      showToast('Reference was removed, but we could not delete the physical file from the server storage.', 'info');
    }
  };

  // Function to delete ALL images from all content fields across the website
  const deleteAllImagesFromAllContent = async () => {
    requestConfirmation(
      'Delete All Website Images?',
      'Are you sure you want to DELETE ALL IMAGES across the entire website? This will clear all hero, destination, tour package, and story image links.',
      async () => {
        if (!localContent) return;
        const clone: SiteContent = JSON.parse(JSON.stringify(localContent));

        if (clone.hero) clone.hero.bgImage = '';

        if (clone.destinations) {
          clone.destinations.forEach((d) => {
            d.imageUrl = '';
            d.gallery = [];
          });
        }

        if (clone.tourPackages) {
          clone.tourPackages.forEach((p) => {
            p.imageUrl = '';
            p.gallery = [];
          });
        }

        if (clone.featuredStories) {
          clone.featuredStories.forEach((s) => {
            s.imageUrl = '';
          });
        }

        if (clone.about?.pillars) {
          clone.about.pillars.forEach((pil) => {
            pil.imageUrl = '';
          });
        }

        if (clone.videoCollaborations) {
          clone.videoCollaborations.forEach((v) => {
            v.thumbnailUrl = '';
          });
        }

        // Delete all uploaded files from server disk
        for (const m of uploadedMedia) {
          try {
            await deleteMediaFile(m.name);
          } catch (err) {
            console.error('Failed to delete media file:', m.name, err);
          }
        }

        setLocalContent(clone);
        await updateContent(clone);
        await fetchMediaLibrary();
        showToast('All images removed and changes saved to website.', 'success');
      },
      true,
      'Delete All',
      'Cancel'
    );
  };

  // Generic content field modifier
  const updateField = (path: string, value: any) => {
    if (!localContent) return;
    const clone = JSON.parse(JSON.stringify(localContent));
    
    const parts = path.split('.');
    let current: any = clone;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    
    setLocalContent(clone);
  };

  // Upload file utility
  const handleImageUpload = async (file: File, onComplete: (url: string) => void) => {
    try {
      const url = await uploadImage(file);
      await fetchMediaLibrary();
      onComplete(url);
    } catch (err) {
      showToast('Media upload failed. Ensure server connection is active.', 'error');
    }
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Trigger Save to Express Server API
  const handleSaveAll = async (updated: SiteContent) => {
    setSaveStatus('saving');
    setSaveMessage('Persisting configuration to storage...');
    
    const success = await updateContent(updated);
    if (success) {
      setSaveStatus('success');
      setSaveMessage('All website changes successfully saved and published live!');
      setTimeout(() => setSaveStatus('idle'), 4000);
    } else {
      setSaveStatus('error');
      setSaveMessage('Save operation failed. Please check connection or authorization.');
    }
  };

  // Revert unsaved edits back to last saved state
  const handleDiscardChanges = () => {
    if (content) {
      setLocalContent(JSON.parse(JSON.stringify(content)));
      setSaveStatus('idle');
      setSaveMessage('');
    }
  };

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) return;

    setAuthLoading(true);
    const success = await login(usernameInput, passwordInput);
    setAuthLoading(false);
    
    if (success) {
      setUsernameInput('');
      setPasswordInput('');
    }
  };

  // Inner helper wrappers providing parent state & handlers to base subcomponents
  const ImagePicker = (props: { label: string; value: string; onChange: (url: string) => void; helpText?: string }) => (
    <ImagePickerBase
      {...props}
      onOpenMediaPicker={(cb) => { setMediaPickerCallback(() => cb); setMediaPickerOpen(true); }}
      onInspectImage={(url) => setPreviewImageUrl(url)}
      onUploadImage={async (file, cb) => handleImageUpload(file, cb)}
      requestConfirmation={requestConfirmation}
    />
  );

  const GalleryEditor = (props: { label?: string; images?: string[]; onChange: (updated: string[]) => void }) => (
    <GalleryEditorBase
      {...props}
      onOpenMediaPicker={(cb) => { setMediaPickerCallback(() => cb); setMediaPickerOpen(true); }}
      onInspectImage={(url) => setPreviewImageUrl(url)}
      onUploadImage={async (file, cb) => handleImageUpload(file, cb)}
      requestConfirmation={requestConfirmation}
    />
  );

  const TabSaveBar = () => (
    <TabSaveBarBase
      hasUnsavedChanges={hasUnsavedChanges}
      saveStatus={saveStatus}
      onSave={() => localContent && handleSaveAll(localContent)}
      onDiscard={handleDiscardChanges}
    />
  );

  // If loading, show clean spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-100">
        <RefreshCw className="w-10 h-10 text-amber-400 animate-spin" />
        <p className="font-sans text-sm font-medium text-zinc-400 animate-pulse">Loading Administrative Control Desk...</p>
      </div>
    );
  }

  // Login Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center py-20 px-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 bg-amber-400/10 rounded-2xl flex items-center justify-center mb-4 border border-amber-400/30">
              <Lock className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="font-display font-bold text-2xl text-zinc-100">Administrative Access</h1>
            <p className="text-sm text-zinc-400 mt-1">Sign in to edit and manage website content</p>
            <div className="mt-3 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-400 flex items-center gap-1.5">
              <span className="text-amber-400 font-semibold">Username:</span> Jafar / Jafer &bull; <span className="text-amber-400 font-semibold">Password:</span> J@9944
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs sm:text-sm flex gap-3">
              <Info className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter admin username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-950 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                  <Key className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-950 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {authLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              <span>Authenticate &amp; Enter</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!localContent) return null;

  // Search Filtered Lists
  const filteredDestinations = localContent.destinations.filter(d => 
    (d.name + ' ' + d.id + ' ' + (d.vibeText || '')).toLowerCase().includes(destSearch.toLowerCase())
  );

  const filteredPackages = localContent.tourPackages.filter(p => 
    (p.title + ' ' + p.destinationValue + ' ' + (p.priceTag || '')).toLowerCase().includes(pkgSearch.toLowerCase())
  );

  const filteredStories = localContent.featuredStories.filter(s => 
    (s.personality + ' ' + s.role + ' ' + s.destination).toLowerCase().includes(storySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-zinc-950 flex items-center justify-center font-display font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-bold text-base text-zinc-100 leading-tight">Admin Content Management Desk</h1>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                <span>Active User: <strong className="text-amber-400">{adminUser?.username}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <span className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-full animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Pending Edits</span>
              </span>
            )}

            <button
              type="button"
              onClick={() => handleSaveAll(localContent)}
              disabled={saveStatus === 'saving'}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saveStatus === 'saving' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Website</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-all cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Save Status Banner Alert */}
      {saveMessage && (
        <div className={`px-4 py-3 text-xs sm:text-sm font-medium flex items-center justify-between border-b ${
          saveStatus === 'success' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
          saveStatus === 'error' ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' :
          'bg-amber-400/10 text-amber-300 border-amber-400/30'
        }`}>
          <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
            {saveStatus === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <Info className="w-4 h-4 shrink-0" />}
            <span>{saveMessage}</span>
          </div>
          <button type="button" onClick={() => setSaveMessage('')} className="p-1 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Side Navigation Tabs */}
          <aside className="w-full lg:w-64 shrink-0">
            <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none sticky top-24">
              {[
                { id: 'hero-about', label: 'Hero & About', icon: Layout },
                { id: 'destinations', label: 'Destinations', icon: Globe },
                { id: 'packages', label: 'Tour Packages', icon: FileText },
                { id: 'stories', label: 'Featured Stories', icon: Sparkles },
                { id: 'media', label: 'Media Library', icon: Grid },
                { id: 'contact-seo', label: 'Contact & SEO', icon: Phone },
                { id: 'design', label: 'Visual Style', icon: Palette },
                { id: 'accounts', label: 'Admin Users', icon: User },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-display text-xs uppercase tracking-wider font-semibold transition-all shrink-0 cursor-pointer text-left ${
                      isActive
                        ? 'bg-amber-400 text-zinc-950 shadow-md font-bold'
                        : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80'
                    }`}
                  >
                    <TabIcon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Tab Content Section */}
          <main className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-8 min-w-0">
            
            {/* 1. HERO & ABOUT SECTION TAB */}
            {activeTab === 'hero-about' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display font-medium text-2xl text-zinc-100">Hero Section Content</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">Edit the main homepage banner heading, tagline, call to action, and background image.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Main Hero Title</label>
                    <textarea
                      rows={2}
                      value={localContent.hero?.title || ''}
                      onChange={(e) => updateField('hero.title', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Hero Subtitle / Tagline</label>
                    <textarea
                      rows={3}
                      value={localContent.hero?.subtitle || ''}
                      onChange={(e) => updateField('hero.subtitle', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Hero Button Label</label>
                    <input
                      type="text"
                      value={localContent.hero?.buttonText || ''}
                      onChange={(e) => updateField('hero.buttonText', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <ImagePicker
                      label="Hero Background Banner Image"
                      value={localContent.hero?.bgImage || ''}
                      onChange={(url) => updateField('hero.bgImage', url)}
                      helpText="Displayed as full-width hero background on desktop and mobile"
                    />
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-8 mt-8">
                  <h2 className="font-display font-medium text-2xl text-zinc-100">About &amp; Synergy Section</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">Configure company legacy, narrative, and operational pillars.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">About Pre-Title</label>
                    <input
                      type="text"
                      value={localContent.about?.title || ''}
                      onChange={(e) => updateField('about.title', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Main Heading</label>
                    <input
                      type="text"
                      value={localContent.about?.subtitle || ''}
                      onChange={(e) => updateField('about.subtitle', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Company Narrative Description</label>
                    <textarea
                      rows={5}
                      value={localContent.about?.description || ''}
                      onChange={(e) => updateField('about.description', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Operational Pillars */}
                <div className="border-t border-zinc-800 pt-8 mt-8 space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-amber-400">Operational Pillars</label>
                  <p className="text-zinc-400 text-xs">Edit the three feature highlights shown on the homepage.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {localContent.about?.pillars?.map((pillar, idx) => (
                      <div key={idx} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                        <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Pillar #{idx + 1}</p>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase text-zinc-400 font-semibold">Title</label>
                          <input
                            type="text"
                            value={pillar.title || ''}
                            onChange={(e) => {
                              const updatedPillars = [...(localContent.about?.pillars || [])];
                              updatedPillars[idx] = { ...pillar, title: e.target.value };
                              updateField('about.pillars', updatedPillars);
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase text-zinc-400 font-semibold">Description</label>
                          <textarea
                            rows={4}
                            value={pillar.text || ''}
                            onChange={(e) => {
                              const updatedPillars = [...(localContent.about?.pillars || [])];
                              updatedPillars[idx] = { ...pillar, text: e.target.value };
                              updateField('about.pillars', updatedPillars);
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="pt-2">
                          <ImagePicker
                            label={`Pillar #${idx + 1} Image`}
                            value={pillar.imageUrl || ''}
                            onChange={(url) => {
                              const updatedPillars = [...(localContent.about?.pillars || [])];
                              updatedPillars[idx] = { ...pillar, imageUrl: url };
                              updateField('about.pillars', updatedPillars);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <TabSaveBar />
              </div>
            )}            {/* 2. DESTINATIONS TAB */}
            {activeTab === 'destinations' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display font-medium text-2xl text-zinc-100">Destination Management</h2>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-1">Manage destination routes, vibe statements, highlights, journey descriptions, and image galleries.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newId = `dest-${Date.now()}`;
                      const newDestinationItem: Destination = {
                        id: newId,
                        name: 'New Destination Route',
                        vibeText: 'Describe the mood and unique highlight of this route...',
                        keyDetails: 'List inclusions, specs, and travel logistics...',
                        imageUrl: '',
                        highlights: ['First highlight detail point'],
                        journeyHighlights: ['First journey highlight point'],
                        journeyDescription: 'Detailed journey description and itinerary...',
                        gallery: []
                      };
                      updateField('destinations', [newDestinationItem, ...localContent.destinations]);
                      setSelectedDestId(newId);
                    }}
                    className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Destination</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search destinations by name or ID..."
                    value={destSearch}
                    onChange={(e) => setDestSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Destinations List with Unrolled Editor Forms */}
                <div className="space-y-4">
                  {filteredDestinations.map((dest) => {
                    const isSelected = selectedDestId === dest.id;

                    return (
                      <div key={dest.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden transition-all">
                        {/* Top Summary Bar */}
                        <div className="p-4 flex items-center justify-between gap-4 bg-zinc-950">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-900 border border-zinc-800">
                              <SafeImage src={dest.imageUrl} alt={dest.name} className="w-full h-full" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-display font-bold text-sm text-zinc-100 truncate">{dest.name}</h4>
                              <p className="font-mono text-[10px] text-amber-400 mt-0.5">ID: {dest.id}</p>
                              <p className="text-[11px] text-zinc-400 truncate mt-0.5">{dest.vibeText || 'No vibe description set'}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setSelectedDestId(isSelected ? null : dest.id)}
                              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                isSelected ? 'bg-amber-400 text-zinc-950 border-amber-400' : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white'
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{isSelected ? 'Close Editor' : 'Edit Destination'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                requestConfirmation(
                                  'Delete Destination',
                                  `Are you sure you want to delete the destination "${dest.name}"? This action cannot be undone.`,
                                  () => {
                                    const updated = localContent.destinations.filter(d => d.id !== dest.id);
                                    updateField('destinations', updated);
                                    if (selectedDestId === dest.id) setSelectedDestId(null);
                                    showToast(`Destination "${dest.name}" removed successfully.`, 'success');
                                  },
                                  true
                                );
                              }}
                              className="p-2.5 bg-zinc-900 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-300 border border-zinc-800 rounded-xl transition-all cursor-pointer"
                              title="Delete Destination"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Unrolled Editing Form Panel */}
                        {isSelected && (
                          <div className="p-6 border-t border-zinc-800 bg-zinc-900/40 space-y-8 animate-fade-in">
                            {/* Section 1: Basic Info & Cover Image */}
                            <div className="space-y-4">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">Basic Info &amp; Cover Image</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Route Slug / Unique ID</label>
                                  <input
                                    type="text"
                                    value={dest.id || ''}
                                    onChange={(e) => {
                                      const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
                                      const updated = localContent.destinations.map(d => d.id === dest.id ? { ...d, id: newSlug } : d);
                                      updateField('destinations', updated);
                                      setSelectedDestId(newSlug);
                                    }}
                                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400 font-mono"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Destination Name</label>
                                  <input
                                    type="text"
                                    value={dest.name || ''}
                                    onChange={(e) => {
                                      const updated = localContent.destinations.map(d => d.id === dest.id ? { ...d, name: e.target.value } : d);
                                      updateField('destinations', updated);
                                    }}
                                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                  />
                                </div>

                                <div className="md:col-span-2">
                                  <ImagePicker
                                    label="Cover Photo Image"
                                    value={dest.imageUrl || ''}
                                    onChange={(url) => {
                                      const updated = localContent.destinations.map(d => d.id === dest.id ? { ...d, imageUrl: url } : d);
                                      updateField('destinations', updated);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Section 2: Vibe & Overview Descriptions */}
                            <div className="space-y-4">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">Overview &amp; Descriptions</h3>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Introduction Subtitle (Vibe Statement)</label>
                                  <textarea
                                    rows={2}
                                    value={dest.vibeText || ''}
                                    onChange={(e) => {
                                      const updated = localContent.destinations.map(d => d.id === dest.id ? { ...d, vibeText: e.target.value } : d);
                                      updateField('destinations', updated);
                                    }}
                                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Key Specifications &amp; Inclusions Summary</label>
                                  <textarea
                                    rows={3}
                                    value={dest.keyDetails || ''}
                                    onChange={(e) => {
                                      const updated = localContent.destinations.map(d => d.id === dest.id ? { ...d, keyDetails: e.target.value } : d);
                                      updateField('destinations', updated);
                                    }}
                                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Detailed Journey Narrative</label>
                                  <textarea
                                    rows={5}
                                    value={dest.journeyDescription || ''}
                                    onChange={(e) => {
                                      const updated = localContent.destinations.map(d => d.id === dest.id ? { ...d, journeyDescription: e.target.value } : d);
                                      updateField('destinations', updated);
                                    }}
                                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                    placeholder="Describe the multi-day trip experience step-by-step..."
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Section 3: Highlights & Journey Features */}
                            <div className="space-y-6">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">Highlights &amp; Feature Points</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ListEditor
                                  label="Destination Highlight Points"
                                  items={dest.highlights || []}
                                  placeholder="Add new highlight point..."
                                  onChange={(updatedList) => {
                                    const updated = localContent.destinations.map(d => d.id === dest.id ? { ...d, highlights: updatedList } : d);
                                    updateField('destinations', updated);
                                  }}
                                />

                                <ListEditor
                                  label="Journey Highlight Points"
                                  items={dest.journeyHighlights || []}
                                  placeholder="Add journey feature point..."
                                  onChange={(updatedList) => {
                                    const updated = localContent.destinations.map(d => d.id === dest.id ? { ...d, journeyHighlights: updatedList } : d);
                                    updateField('destinations', updated);
                                  }}
                                />
                              </div>
                            </div>

                            {/* Section 4: Image Gallery */}
                            <div className="space-y-4">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">Image Gallery Collection</h3>
                              <GalleryEditor
                                label="Photos for this destination"
                                images={dest.gallery || []}
                                onChange={(updatedGallery) => {
                                  const updated = localContent.destinations.map(d => d.id === dest.id ? { ...d, gallery: updatedGallery } : d);
                                  updateField('destinations', updated);
                                }}
                              />
                            </div>

                            {/* Save Bar inside card */}
                            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                              <span className="text-xs text-zinc-400">Editing "{dest.name}"</span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={handleDiscardChanges}
                                  disabled={!hasUnsavedChanges}
                                  className="px-4 py-2.5 bg-zinc-850 hover:bg-zinc-800 disabled:hover:bg-transparent text-zinc-300 disabled:text-zinc-600 border border-zinc-800 disabled:border-zinc-800/30 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Discard Changes</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => localContent && handleSaveAll(localContent)}
                                  disabled={saveStatus === 'saving'}
                                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                  {saveStatus === 'saving' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                  <span>Save All Changes</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {filteredDestinations.length === 0 && (
                    <div className="p-8 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
                      No destinations matched your search query.
                    </div>
                  )}
                </div>

                <TabSaveBar />
              </div>
            )}

            {/* 3. TOUR PACKAGES TAB */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display font-medium text-2xl text-zinc-100">Tour Package Management</h2>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-1">Create and edit tour packages, price tags, journey highlights, included amenities, and gallery images.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newId = `pkg-${Date.now()}`;
                      const newPackageItem: TourPackage = {
                        id: newId,
                        title: 'New Signature Expedition Package',
                        highlights: 'Domestically booked flights, luxury transport, guided support, selected meals.',
                        imageUrl: '',
                        destinationValue: localContent.destinations[0]?.name || 'Afar Expedition',
                        priceTag: 'Signature Tier',
                        description: 'Detailed package description and experience overview...',
                        journeyHighlights: ['Highlight point 1', 'Highlight point 2'],
                        includedItems: ['Accommodation', 'Guided tours', 'Breakfast'],
                        gallery: []
                      };
                      updateField('tourPackages', [newPackageItem, ...localContent.tourPackages]);
                      setSelectedPkgId(newId);
                    }}
                    className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Package</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search tour packages by title, category, or destination..."
                    value={pkgSearch}
                    onChange={(e) => setPkgSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Packages List with Unrolled Editor Forms */}
                <div className="space-y-4">
                  {filteredPackages.map((pkg) => {
                    const isSelected = selectedPkgId === pkg.id;

                    return (
                      <div key={pkg.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden transition-all">
                        {/* Top Summary Bar */}
                        <div className="p-4 flex items-center justify-between gap-4 bg-zinc-950">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-900 border border-zinc-800">
                              <SafeImage src={pkg.imageUrl} alt={pkg.title} className="w-full h-full" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-display font-bold text-sm text-zinc-100 truncate">{pkg.title}</h4>
                              <div className="flex flex-wrap gap-1.5 mt-1 items-center">
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-medium">{pkg.priceTag || 'Standard'}</span>
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">{pkg.destinationValue}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setSelectedPkgId(isSelected ? null : pkg.id)}
                              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                isSelected ? 'bg-amber-400 text-zinc-950 border-amber-400' : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white'
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{isSelected ? 'Close Editor' : 'Edit Package'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                requestConfirmation(
                                  'Delete Tour Package',
                                  `Are you sure you want to delete the tour package "${pkg.title}"? This action cannot be undone.`,
                                  () => {
                                    const updated = localContent.tourPackages.filter(p => p.id !== pkg.id);
                                    updateField('tourPackages', updated);
                                    if (selectedPkgId === pkg.id) setSelectedPkgId(null);
                                    showToast(`Tour package "${pkg.title}" removed successfully.`, 'success');
                                  },
                                  true
                                );
                              }}
                              className="p-2.5 bg-zinc-900 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-300 border border-zinc-800 rounded-xl transition-all cursor-pointer"
                              title="Delete Package"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Unrolled Editing Form Panel */}
                        {isSelected && (
                          <div className="p-6 border-t border-zinc-800 bg-zinc-900/40 space-y-8 animate-fade-in">
                            {/* Section 1: Basic Info & Cover */}
                            <div className="space-y-4">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">Package Connection &amp; Cover</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Package Unique ID</label>
                                  <input
                                    type="text"
                                    value={pkg.id || ''}
                                    onChange={(e) => {
                                      const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
                                      const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, id: newSlug } : p);
                                      updateField('tourPackages', updated);
                                      setSelectedPkgId(newSlug);
                                    }}
                                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400 font-mono"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Linked Destination Connection</label>
                                  <select
                                    value={pkg.destinationValue || ''}
                                    onChange={(e) => {
                                      const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, destinationValue: e.target.value } : p);
                                      updateField('tourPackages', updated);
                                    }}
                                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-xl text-sm focus:outline-none focus:border-amber-400"
                                  >
                                    <option value="" className="bg-zinc-900 text-zinc-100">-- Select Linked Destination --</option>
                                    {localContent.destinations.map(d => (
                                      <option key={d.id} value={d.name} className="bg-zinc-900 text-zinc-100">{d.name}</option>
                                    ))}
                                  </select>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Package Title</label>
                                  <input
                                    type="text"
                                    value={pkg.title || ''}
                                    onChange={(e) => {
                                      const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, title: e.target.value } : p);
                                      updateField('tourPackages', updated);
                                    }}
                                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Price Tag / Tier Badge</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Premium Tier, Signature Expedition"
                                    value={pkg.priceTag || ''}
                                    onChange={(e) => {
                                      const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, priceTag: e.target.value } : p);
                                      updateField('tourPackages', updated);
                                    }}
                                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                  />
                                </div>

                                <div className="md:col-span-2">
                                  <ImagePicker
                                    label="Cover Photo Image"
                                    value={pkg.imageUrl || ''}
                                    onChange={(url) => {
                                      const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, imageUrl: url } : p);
                                      updateField('tourPackages', updated);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Section 2: Details & Description */}
                            <div className="space-y-4">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">Overview &amp; Descriptions</h3>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Package Summary Highlights</label>
                                  <textarea
                                    rows={3}
                                    value={pkg.highlights || ''}
                                    onChange={(e) => {
                                      const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, highlights: e.target.value } : p);
                                      updateField('tourPackages', updated);
                                    }}
                                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Detailed Package Description</label>
                                  <textarea
                                    rows={4}
                                    value={pkg.description || ''}
                                    onChange={(e) => {
                                      const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, description: e.target.value } : p);
                                      updateField('tourPackages', updated);
                                    }}
                                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Section 3: Journey Highlights & Included Items */}
                            <div className="space-y-6">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">Features &amp; Inclusions</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ListEditor
                                  label="Journey Highlights"
                                  items={pkg.journeyHighlights || []}
                                  placeholder="Add journey highlight point..."
                                  onChange={(updatedList) => {
                                    const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, journeyHighlights: updatedList } : p);
                                    updateField('tourPackages', updated);
                                  }}
                                />

                                <ListEditor
                                  label="Included Services & Amenities"
                                  items={pkg.includedItems || []}
                                  placeholder="Add included item..."
                                  onChange={(updatedList) => {
                                    const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, includedItems: updatedList } : p);
                                    updateField('tourPackages', updated);
                                  }}
                                />
                              </div>
                            </div>

                            {/* Section 4: Image Gallery */}
                            <div className="space-y-4">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">Package Image Gallery</h3>
                              <GalleryEditor
                                label="Photos for this package"
                                images={pkg.gallery || []}
                                onChange={(updatedGallery) => {
                                  const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, gallery: updatedGallery } : p);
                                  updateField('tourPackages', updated);
                                }}
                              />
                            </div>

                            {/* Section 5: Explore the Journey (Visual Experience) */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Explore the Journey (Visual Experience)</h3>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentLocations = pkg.exploreJourney || [];
                                    const newLoc = {
                                      id: `loc-${Date.now()}`,
                                      title: 'New Location',
                                      description: 'Short location description',
                                      images: []
                                    };
                                    const updated = localContent.tourPackages.map(p => 
                                      p.id === pkg.id ? { ...p, exploreJourney: [...currentLocations, newLoc] } : p
                                    );
                                    updateField('tourPackages', updated);
                                  }}
                                  className="text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add Location</span>
                                </button>
                              </div>

                              {(pkg.exploreJourney || []).length === 0 ? (
                                <p className="text-xs text-zinc-500 italic">No journey locations defined for this tour.</p>
                              ) : (
                                <div className="space-y-4">
                                  {(pkg.exploreJourney || []).map((loc, locIndex) => (
                                    <div key={loc.id || locIndex} className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 space-y-3">
                                      <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 flex-grow">
                                          <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 text-[10px] font-bold flex items-center justify-center font-mono shrink-0">
                                            {locIndex + 1}
                                          </span>
                                          <input
                                            type="text"
                                            value={loc.title}
                                            placeholder="Location Title (e.g. Dallol)"
                                            onChange={(e) => {
                                              const updatedLocs = [...(pkg.exploreJourney || [])];
                                              updatedLocs[locIndex] = { ...updatedLocs[locIndex], title: e.target.value };
                                              const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, exploreJourney: updatedLocs } : p);
                                              updateField('tourPackages', updated);
                                            }}
                                            className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-100 focus:border-amber-400 focus:outline-none flex-grow"
                                          />
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updatedLocs = (pkg.exploreJourney || []).filter((_, idx) => idx !== locIndex);
                                            const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, exploreJourney: updatedLocs } : p);
                                            updateField('tourPackages', updated);
                                          }}
                                          className="text-zinc-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                                          title="Remove Location"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>

                                      <input
                                        type="text"
                                        value={loc.description}
                                        placeholder="Short description sentence..."
                                        onChange={(e) => {
                                          const updatedLocs = [...(pkg.exploreJourney || [])];
                                          updatedLocs[locIndex] = { ...updatedLocs[locIndex], description: e.target.value };
                                          const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, exploreJourney: updatedLocs } : p);
                                          updateField('tourPackages', updated);
                                        }}
                                        className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-300 focus:border-amber-400 focus:outline-none"
                                      />

                                      <GalleryEditor
                                        label={`Images for ${loc.title || 'Location'}`}
                                        images={loc.images || []}
                                        onChange={(updatedImages) => {
                                          const updatedLocs = [...(pkg.exploreJourney || [])];
                                          updatedLocs[locIndex] = { ...updatedLocs[locIndex], images: updatedImages };
                                          const updated = localContent.tourPackages.map(p => p.id === pkg.id ? { ...p, exploreJourney: updatedLocs } : p);
                                          updateField('tourPackages', updated);
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Save Bar inside card */}
                            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                              <span className="text-xs text-zinc-400">Editing "{pkg.title}"</span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={handleDiscardChanges}
                                  disabled={!hasUnsavedChanges}
                                  className="px-4 py-2.5 bg-zinc-850 hover:bg-zinc-800 disabled:hover:bg-transparent text-zinc-300 disabled:text-zinc-600 border border-zinc-800 disabled:border-zinc-800/30 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Discard Changes</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => localContent && handleSaveAll(localContent)}
                                  disabled={saveStatus === 'saving'}
                                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                  {saveStatus === 'saving' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                  <span>Save All Changes</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {filteredPackages.length === 0 && (
                    <div className="p-8 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
                      No tour packages matched your search query.
                    </div>
                  )}
                </div>

                <TabSaveBar />
              </div>
            )}

            {/* 4. FEATURED STORIES TAB */}
            {activeTab === 'stories' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display font-medium text-2xl text-zinc-100">Featured Guest Stories</h2>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-1">Manage traveler profiles, quotes, stories, and layout styles.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newId = `story-${Date.now()}`;
                      const newStoryItem: FeaturedStory = {
                        id: newId,
                        personality: 'New Featured Traveler',
                        role: 'Explorer & Cultural Enthusiast',
                        destination: 'Afar Expedition',
                        moment: 'Unforgettable journey moment...',
                        quote: '“Travel changes the way we see the world...”',
                        description: 'Detailed story narrative...',
                        imageUrl: PRESET_IMAGES[2].url,
                        destinationName: 'Afar Tour',
                        layoutType: 'portrait-right'
                      };
                      updateField('featuredStories', [newStoryItem, ...localContent.featuredStories]);
                      setSelectedStoryId(newId);
                    }}
                    className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Featured Traveler</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search traveler profiles by name, role, or destination..."
                    value={storySearch}
                    onChange={(e) => setStorySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Traveler profiles List */}
                <div className="space-y-4">
                  {filteredStories.map((story) => {
                    const isSelected = selectedStoryId === story.id;

                    return (
                      <div key={story.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden transition-all">
                        {/* Summary Bar */}
                        <div className="p-4 flex items-center justify-between gap-4 bg-zinc-950">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-900 border border-zinc-800">
                              <SafeImage src={story.imageUrl} alt={story.personality} className="w-full h-full" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-display font-bold text-sm text-zinc-100 truncate">{story.personality}</h4>
                              <p className="text-[11px] text-amber-400 truncate mt-0.5">{story.role}</p>
                              <p className="font-mono text-[9px] text-zinc-400 truncate mt-0.5">{story.destination}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setSelectedStoryId(isSelected ? null : story.id)}
                              className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                isSelected ? 'bg-amber-400 text-zinc-950 border-amber-400' : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white'
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{isSelected ? 'Close Editor' : 'Expand / Edit'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                requestConfirmation(
                                  'Delete Ambassador Profile',
                                  `Are you sure you want to delete the ambassador profile for "${story.personality}"? This action cannot be undone.`,
                                  () => {
                                    const updated = localContent.featuredStories.filter(s => s.id !== story.id);
                                    updateField('featuredStories', updated);
                                    if (selectedStoryId === story.id) setSelectedStoryId(null);
                                    showToast(`Ambassador profile "${story.personality}" removed successfully.`, 'success');
                                  },
                                  true
                                );
                              }}
                              className="p-2.5 bg-zinc-900 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-300 border border-zinc-800 rounded-xl transition-all cursor-pointer"
                              title="Delete Profile"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Edit Card */}
                        {isSelected && (
                          <div className="p-6 border-t border-zinc-800 bg-zinc-900/40 space-y-6 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Personality Name</label>
                                <input
                                  type="text"
                                  value={story.personality || ''}
                                  onChange={(e) => {
                                    const updated = localContent.featuredStories.map(s => s.id === story.id ? { ...s, personality: e.target.value } : s);
                                    updateField('featuredStories', updated);
                                  }}
                                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Role / Designation</label>
                                <input
                                  type="text"
                                  value={story.role || ''}
                                  onChange={(e) => {
                                    const updated = localContent.featuredStories.map(s => s.id === story.id ? { ...s, role: e.target.value } : s);
                                    updateField('featuredStories', updated);
                                  }}
                                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                />
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Destination Heading</label>
                                <input
                                  type="text"
                                  value={story.destination || ''}
                                  onChange={(e) => {
                                    const updated = localContent.featuredStories.map(s => s.id === story.id ? { ...s, destination: e.target.value } : s);
                                    updateField('featuredStories', updated);
                                  }}
                                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                />
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Travel Quote Statement</label>
                                <textarea
                                  rows={3}
                                  value={story.quote || ''}
                                  onChange={(e) => {
                                    const updated = localContent.featuredStories.map(s => s.id === story.id ? { ...s, quote: e.target.value } : s);
                                    updateField('featuredStories', updated);
                                  }}
                                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                />
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Detailed Bio Narrative</label>
                                <textarea
                                  rows={4}
                                  value={story.description || ''}
                                  onChange={(e) => {
                                    const updated = localContent.featuredStories.map(s => s.id === story.id ? { ...s, description: e.target.value } : s);
                                    updateField('featuredStories', updated);
                                  }}
                                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Card Layout Type</label>
                                <select
                                  value={story.layoutType || 'portrait-right'}
                                  onChange={(e) => {
                                    const updated = localContent.featuredStories.map(s => s.id === story.id ? { ...s, layoutType: e.target.value } : s);
                                    updateField('featuredStories', updated);
                                  }}
                                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-xl text-sm focus:outline-none focus:border-amber-400"
                                >
                                  <option value="portrait-right" className="bg-zinc-900 text-zinc-100">Portrait on Right</option>
                                  <option value="portrait-left" className="bg-zinc-900 text-zinc-100">Portrait on Left</option>
                                  <option value="wide-left" className="bg-zinc-900 text-zinc-100">Wide Image on Left</option>
                                  <option value="wide-right" className="bg-zinc-900 text-zinc-100">Wide Image on Right</option>
                                </select>
                              </div>

                              <div className="md:col-span-2">
                                <ImagePicker
                                  label="Portrait Cover Photo"
                                  value={story.imageUrl || ''}
                                  onChange={(url) => {
                                    const updated = localContent.featuredStories.map(s => s.id === story.id ? { ...s, imageUrl: url } : s);
                                    updateField('featuredStories', updated);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {filteredStories.length === 0 && (
                    <div className="p-8 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
                      No featured travelers matched your search query.
                    </div>
                  )}
                </div>

                <TabSaveBar />
              </div>
            )}

            {/* 5. MEDIA LIBRARY TAB */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display font-medium text-2xl text-zinc-100">Website Media Library</h2>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                      Browse, upload, inspect, copy links, or manage all images across destinations, tour packages, hero banners, and user uploads.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        setPickerDirectUrl('');
                        setMediaPickerOpen(true);
                      }}
                      className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-700 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
                      title="Add or inspect image links and Google Drive URLs"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>Add Link / URL</span>
                    </button>
                    <button
                      type="button"
                      onClick={deleteAllImagesFromAllContent}
                      className="px-4 py-3 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
                      title="Delete all images across the entire website"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete All Images</span>
                    </button>
                    <label className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md">
                      <Upload className="w-4 h-4" />
                      <span>Upload New Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          await handleImageUpload(file, async (uploadedUrl) => {
                            await addLinkToMediaLibrary(uploadedUrl);
                          });
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Quick Add URL Input Bar in Media Tab */}
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shadow-lg">
                  <div className="flex-1 flex items-center gap-2.5 bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5">
                    <LinkIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Paste Image URL or Google Drive share link here..."
                      value={mediaTabInputUrl}
                      onChange={(e) => setMediaTabInputUrl(e.target.value)}
                      className="w-full bg-transparent text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={!mediaTabInputUrl.trim()}
                    onClick={async () => {
                      const added = await addLinkToMediaLibrary(mediaTabInputUrl.trim());
                      if (added) {
                        setMediaTabInputUrl('');
                        showToast('Image link successfully added to Media Library and saved!', 'success');
                      } else {
                        showToast('Please enter a valid image URL or Google Drive share link.', 'error');
                      }
                    }}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Library</span>
                  </button>
                </div>

                {/* Media Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search media by image URL or filename..."
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {allIndexedWebsiteImages
                    .filter(img => img.toLowerCase().includes(mediaSearch.toLowerCase()))
                    .map((imgUrl, idx) => {
                      const isUploaded = imgUrl.startsWith('/uploads/');
                      const isCopied = copiedUrl === imgUrl;

                      return (
                        <div key={idx} className="group bg-zinc-950 border border-zinc-800 hover:border-amber-400/50 rounded-2xl overflow-hidden flex flex-col transition-all shadow-md">
                          <div className="relative h-36 bg-zinc-900 overflow-hidden">
                            <SafeImage src={imgUrl} alt={`Media ${idx}`} className="w-full h-full group-hover:scale-105 transition-transform" />
                            
                            {/* Overlay Controls */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                              <button
                                type="button"
                                onClick={() => setPreviewImageUrl(formatImageUrl(imgUrl))}
                                className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors cursor-pointer"
                                title="Inspect Image"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(imgUrl)}
                                className="p-2 bg-amber-400 text-zinc-950 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                                title="Copy Image Link"
                              >
                                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  requestConfirmation(
                                    'Delete Image?',
                                    `Are you sure you want to delete this image (${imgUrl.split('/').pop()}) from all website sections? This will remove all image references and delete the file from storage if uploaded.`,
                                    async () => {
                                      await deleteImageFromAllContent(imgUrl);
                                    },
                                    true
                                  );
                                }}
                                className="p-2 bg-rose-500/80 hover:bg-rose-600 text-white rounded-lg transition-colors cursor-pointer"
                                title="Delete Image from Website"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Badge */}
                            <div className="absolute top-2 left-2">
                              {isUploaded ? (
                                <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-500/90 text-zinc-950 font-bold uppercase tracking-wider">
                                  Upload
                                </span>
                              ) : (
                                <span className="text-[9px] px-2 py-0.5 rounded-md bg-zinc-900/90 text-amber-400 border border-amber-400/30 font-bold uppercase tracking-wider">
                                  Indexed
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="p-2.5 flex-1 flex flex-col justify-between">
                            <p className="text-[10px] font-mono text-zinc-400 truncate" title={imgUrl}>
                              {imgUrl.split('/').pop()}
                            </p>
                            <div className="mt-2 flex items-center justify-between gap-1 border-t border-zinc-800/80 pt-2">
                              <button
                                type="button"
                                onClick={() => copyToClipboard(imgUrl)}
                                className="text-[10px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy URL</span>
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  requestConfirmation(
                                    'Delete Image?',
                                    `Are you sure you want to delete this image from all website sections? This will remove all image references and delete the file from storage if uploaded.`,
                                    async () => {
                                      await deleteImageFromAllContent(imgUrl);
                                    },
                                    true
                                  );
                                }}
                                className="text-[10px] text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 cursor-pointer"
                                title="Delete Image"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <TabSaveBar />
              </div>
            )}

            {/* 6. CONTACT & SEO TAB */}
            {activeTab === 'contact-seo' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display font-medium text-2xl text-zinc-100">Contact Information &amp; Social Links</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">Configure business phones, office addresses, email support, and messaging links.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Phone Line 1</label>
                    <input
                      type="text"
                      value={localContent.contactInfo?.phoneFormatted1 || ''}
                      onChange={(e) => updateField('contactInfo.phoneFormatted1', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Phone Line 2</label>
                    <input
                      type="text"
                      value={localContent.contactInfo?.phoneFormatted2 || ''}
                      onChange={(e) => updateField('contactInfo.phoneFormatted2', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Physical Office Address</label>
                    <input
                      type="text"
                      value={localContent.contactInfo?.office || ''}
                      onChange={(e) => updateField('contactInfo.office', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Support Email</label>
                    <input
                      type="email"
                      value={localContent.contactInfo?.email || ''}
                      onChange={(e) => updateField('contactInfo.email', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">WhatsApp Direct Link URL</label>
                    <input
                      type="text"
                      value={localContent.contactInfo?.whatsAppUrl || ''}
                      onChange={(e) => updateField('contactInfo.whatsAppUrl', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                      <span>Telegram Chat / Direct Link (t.me)</span>
                      <span className="text-[10px] text-amber-400 font-normal">Primary: {localContent.contactInfo?.phoneFormatted1 || CONTACT_INFO.phoneFormatted1}</span>
                    </label>
                    <input
                      type="text"
                      placeholder="https://t.me/+251910503969"
                      value={localContent.contactInfo?.telegramUrl || ''}
                      onChange={(e) => updateField('contactInfo.telegramUrl', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">TikTok Profile Link</label>
                    <input
                      type="text"
                      value={localContent.contactInfo?.tiktokUrl || ''}
                      onChange={(e) => updateField('contactInfo.tiktokUrl', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Instagram Profile Link</label>
                    <input
                      type="text"
                      value={localContent.contactInfo?.instagramUrl || ''}
                      onChange={(e) => updateField('contactInfo.instagramUrl', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Facebook Profile Link / Redirect URL</label>
                    <input
                      type="text"
                      value={localContent.contactInfo?.facebookUrl || ''}
                      onChange={(e) => updateField('contactInfo.facebookUrl', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-8 mt-8">
                  <h2 className="font-display font-medium text-2xl text-zinc-100">SEO &amp; Search Engine Meta</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">Configure search titles, meta descriptions, and indexing keywords.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Page Head Title</label>
                    <input
                      type="text"
                      value={localContent.seo?.pageTitle || ''}
                      onChange={(e) => updateField('seo.pageTitle', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Search Meta Description</label>
                    <textarea
                      rows={3}
                      value={localContent.seo?.metaDescription || ''}
                      onChange={(e) => updateField('seo.metaDescription', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Search Keywords (comma separated)</label>
                    <input
                      type="text"
                      value={localContent.seo?.keywords || ''}
                      onChange={(e) => updateField('seo.keywords', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <TabSaveBar />
              </div>
            )}

            {/* 7. WEBSITE DESIGN APPEARANCE TAB */}
            {activeTab === 'design' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display font-medium text-2xl text-zinc-100">Visual Styling &amp; Theme Colors</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">Customize color accents, font families, margins, and button corner styles.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Accent Highlight Color</label>
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="color"
                        value={localContent.design?.primaryColor || '#FF9E00'}
                        onChange={(e) => updateField('design.primaryColor', e.target.value)}
                        className="w-12 h-12 bg-transparent border-0 cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={localContent.design?.primaryColor || '#FF9E00'}
                        onChange={(e) => updateField('design.primaryColor', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Background Canvas Color</label>
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="color"
                        value={localContent.design?.backgroundColor || '#0A0A0A'}
                        onChange={(e) => updateField('design.backgroundColor', e.target.value)}
                        className="w-12 h-12 bg-transparent border-0 cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={localContent.design?.backgroundColor || '#0A0A0A'}
                        onChange={(e) => updateField('design.backgroundColor', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Card Background Color</label>
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="color"
                        value={localContent.design?.cardColor || '#141414'}
                        onChange={(e) => updateField('design.cardColor', e.target.value)}
                        className="w-12 h-12 bg-transparent border-0 cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={localContent.design?.cardColor || '#141414'}
                        onChange={(e) => updateField('design.cardColor', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-800 pt-8 mt-8">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Typography Font Family</label>
                    <select
                      value={localContent.design?.fontFamily || 'Inter'}
                      onChange={(e) => updateField('design.fontFamily', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded-xl text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value="Inter" className="bg-zinc-900 text-zinc-100">Inter (Swiss / Modern)</option>
                      <option value="Space Grotesk" className="bg-zinc-900 text-zinc-100">Space Grotesk (Tech Future)</option>
                      <option value="Outfit" className="bg-zinc-900 text-zinc-100">Outfit (Clean Geometry)</option>
                      <option value="Playfair Display" className="bg-zinc-900 text-zinc-100">Playfair Display (Editorial Elegance)</option>
                      <option value="JetBrains Mono" className="bg-zinc-900 text-zinc-100">JetBrains Mono (Technical Mono)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Section Layout Padding</label>
                    <select
                      value={localContent.design?.sectionSpacing || 'comfortable'}
                      onChange={(e) => updateField('design.sectionSpacing', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded-xl text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value="compact" className="bg-zinc-900 text-zinc-100">Compact Spacing</option>
                      <option value="comfortable" className="bg-zinc-900 text-zinc-100">Comfortable Spacing</option>
                      <option value="spacious" className="bg-zinc-900 text-zinc-100">Spacious Spacing</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Button Corner Style</label>
                    <select
                      value={localContent.design?.buttonStyle || 'rounded'}
                      onChange={(e) => updateField('design.buttonStyle', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded-xl text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value="rounded" className="bg-zinc-900 text-zinc-100">Rounded Corners (Full)</option>
                      <option value="semi-rounded" className="bg-zinc-900 text-zinc-100">Bento Corners (Medium)</option>
                      <option value="sharp" className="bg-zinc-900 text-zinc-100">Sharp Brutalist Corners</option>
                    </select>
                  </div>
                </div>

                {/* BROWSER FAVICON CONTROLLER */}
                <div className="border-t border-zinc-800/80 pt-8 mt-8 space-y-6">
                  <div>
                    <h3 className="font-display font-medium text-lg text-zinc-100 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-amber-400" />
                      <span>Browser Favicon Settings &amp; Presets</span>
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                      Customize the tiny icon that appears in the web browser tab. Select from exquisite presets, input a custom web URL, upload an image, or reset to default.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-950/40 border border-zinc-800/80 rounded-2xl p-6">
                    {/* Live Tab Preview simulation */}
                    <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">Live Tab Preview</span>
                      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 shadow-md flex items-center gap-3 select-none">
                        <div className="w-7 h-7 rounded bg-zinc-850 border border-zinc-750 flex items-center justify-center overflow-hidden shrink-0">
                          {localContent.design?.favicon ? (
                            <img 
                              src={localContent.design.favicon} 
                              alt="Favicon" 
                              className="w-4.5 h-4.5 object-contain"
                              onError={(e) => {
                                // Fallback icon on loading error
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
                              }}
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <Compass className="w-4 h-4 text-amber-400" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-medium text-zinc-300 truncate font-sans leading-tight">
                            {localContent.seo?.pageTitle || 'Explore Ethiopia'}
                          </p>
                          <p className="text-[9px] text-zinc-500 font-sans truncate leading-none mt-0.5">
                            https://exploreethiopatourandtravel.com.et
                          </p>
                        </div>
                      </div>

                      {/* Info callout */}
                      <div className="p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-900 text-[11px] text-zinc-400 space-y-1.5 font-sans leading-relaxed">
                        <p className="font-semibold text-zinc-300">💡 Why Favicons Matter</p>
                        <p>Favicons are essential branding components. Modern web browsers render them on active tabs, bookmark bars, mobile home screen shortcuts, and search engine indexes.</p>
                      </div>
                    </div>

                    {/* Controller interface */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      {/* 1. Presets */}
                      <div className="space-y-3">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">Select a Premium Preset</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            {
                              id: 'default',
                              name: 'Golden Compass',
                              value: '/favicon.svg',
                              previewIcon: Compass,
                              color: 'text-amber-400',
                            },
                            {
                              id: 'safari',
                              name: 'Sunset Safari',
                              value: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23F97316" stroke-width="2"><circle cx="12" cy="12" r="10" fill="%23F97316" fill-opacity="0.2" /><circle cx="12" cy="12" r="4" fill="%23FEF08A" /></svg>',
                              previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23F97316" stroke-width="2"><circle cx="12" cy="12" r="10" fill="%23F97316" fill-opacity="0.2" /><circle cx="12" cy="12" r="4" fill="%23FEF08A" /></svg>',
                            },
                            {
                              id: 'volcano',
                              name: 'Volcanic Rift',
                              value: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23EF4444" stroke-width="2"><path d="M4 20h16L12 4z" fill="%23EF4444" fill-opacity="0.2" /><circle cx="12" cy="12" r="3" fill="%23F59E0B" /></svg>',
                              previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23EF4444" stroke-width="2"><path d="M4 20h16L12 4z" fill="%23EF4444" fill-opacity="0.2" /><circle cx="12" cy="12" r="3" fill="%23F59E0B" /></svg>',
                            },
                            {
                              id: 'mountains',
                              name: 'Highland Peak',
                              value: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2310B981" stroke-width="2"><path d="M3 20h18M3 20l7-10 4 6 5-8" /><circle cx="12" cy="6" r="2" fill="%23F59E0B" /></svg>',
                              previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2310B981" stroke-width="2"><path d="M3 20h18M3 20l7-10 4 6 5-8" /><circle cx="12" cy="6" r="2" fill="%23F59E0B" /></svg>',
                            },
                            {
                              id: 'royal',
                              name: 'Royal Heritage',
                              value: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23EAB308" stroke-width="2"><rect x="4" y="6" width="16" height="12" rx="2" fill="%2322C55E" fill-opacity="0.1" /><polygon points="12,7 15,17 7,11 17,11 9,17" fill="%23EAB308" /></svg>',
                              previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23EAB308" stroke-width="2"><rect x="4" y="6" width="16" height="12" rx="2" fill="%2322C55E" fill-opacity="0.1" /><polygon points="12,7 15,17 7,11 17,11 9,17" fill="%23EAB308" /></svg>',
                            },
                            {
                              id: 'globe',
                              name: 'Globe Explorer',
                              value: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%233B82F6" stroke-width="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10" /></svg>',
                              previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%233B82F6" stroke-width="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10" /></svg>',
                            },
                          ].map((preset) => {
                            const isSelected = localContent.design?.favicon === preset.value;
                            return (
                              <button
                                key={preset.id}
                                type="button"
                                onClick={() => updateField('design.favicon', preset.value)}
                                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                  isSelected 
                                    ? 'bg-amber-400/10 border-amber-400 text-amber-400 font-bold' 
                                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-zinc-100'
                                }`}
                              >
                                <div className="w-7 h-7 rounded-lg bg-zinc-950 flex items-center justify-center shrink-0 overflow-hidden border border-zinc-800">
                                  {preset.previewIcon ? (
                                    <preset.previewIcon className={`w-4 h-4 ${preset.color}`} />
                                  ) : (
                                    <img src={preset.previewUrl} alt={preset.name} className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
                                  )}
                                </div>
                                <span className="text-[11px] font-semibold truncate leading-tight">{preset.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. Custom Input Link */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">Custom Favicon Link / Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={localContent.design?.favicon || ''}
                            onChange={(e) => updateField('design.favicon', e.target.value)}
                            placeholder="https://example.com/my-logo.png or choose from presets"
                            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-400 placeholder:text-zinc-600 font-mono"
                          />
                          {localContent.design?.favicon && (
                            <button
                              type="button"
                              onClick={() => updateField('design.favicon', '')}
                              className="px-3 bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center"
                              title="Delete/Reset Favicon"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-500 font-sans leading-none mt-1">
                          Supports absolute web URLs (.png, .ico, .svg, .jpg) or dynamic inline SVG data-URIs.
                        </p>
                      </div>

                      {/* 3. Upload File / Choose from Media */}
                      <div className="space-y-3">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">Upload Custom Favicon or Select from Media Library</label>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          {/* File input */}
                          <div className="relative flex-1">
                            <input
                              type="file"
                              accept="image/png, image/svg+xml, image/x-icon, image/jpeg"
                              id="favicon-upload-btn"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                  await handleImageUpload(file, async (uploadedUrl) => {
                                    updateField('design.favicon', uploadedUrl);
                                  });
                                } catch (err) {
                                  console.error("Favicon upload error:", err);
                                }
                              }}
                            />
                            <label
                              htmlFor="favicon-upload-btn"
                              className="w-full h-11 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-zinc-100 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                            >
                              <Upload className="w-4 h-4 text-amber-400" />
                              <span>Upload Favicon</span>
                            </label>
                          </div>

                          {/* Quick selection from loaded media library */}
                          <div className="flex-1">
                            <select
                              value={localContent.design?.favicon || ''}
                              onChange={(e) => {
                                if (e.target.value) {
                                  updateField('design.favicon', e.target.value);
                                }
                              }}
                              className="w-full h-11 px-4 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-400 cursor-pointer"
                            >
                              <option value="">-- Quick Select from Media --</option>
                              {Array.from(new Set([
                                '/favicon.svg',
                                ...(localContent.mediaGallery || []),
                                ...uploadedMedia.map(m => m.url),
                                ...(localContent.destinations?.map(d => d.imageUrl) || []),
                                ...(localContent.tourPackages?.map(p => p.imageUrl) || [])
                              ].filter(Boolean))).map((imgUrl, idx) => {
                                const name = imgUrl.split('/').pop()?.split('?')[0] || `Image ${idx + 1}`;
                                return (
                                  <option key={`${imgUrl}-${idx}`} value={imgUrl} className="bg-zinc-950 text-zinc-300">
                                    {name.length > 35 ? `${name.slice(0, 32)}...` : name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <TabSaveBar />
              </div>
            )}

            {/* 8. ADMIN ACCOUNTS TAB */}
            {activeTab === 'accounts' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display font-medium text-2xl text-zinc-100">Administrator Accounts &amp; Security</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">Manage admin credentials, add secondary users, or reset passwords.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* List Admin Users */}
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xs text-amber-400 uppercase tracking-widest">Active Administrator Accounts</h3>
                    
                    <div className="space-y-3">
                      {adminUsersList.map((user) => (
                        <div key={user.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-amber-400 border border-zinc-800 font-bold font-display text-sm">
                              {user.username.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-sans font-bold text-sm text-zinc-100">{user.username}</p>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                                user.enabled ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                              }`}>
                                {user.enabled ? 'Enabled' : 'Disabled'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditAdminId(user.id);
                                setEditAdminUsername(user.username);
                                setEditAdminPassword('');
                                setEditAdminEnabled(user.enabled);
                              }}
                              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-zinc-800 transition-all cursor-pointer"
                              title="Edit Admin Settings"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={async () => {
                                if (user.id === adminUser?.id) {
                                  showToast('You cannot delete your own active admin account.', 'error');
                                  return;
                                }
                                requestConfirmation(
                                  'Delete Admin Account',
                                  `Are you sure you want to delete the administrator account "${user.username}"?`,
                                  async () => {
                                    await deleteAdminUser(user.id);
                                    showToast(`Administrator account "${user.username}" deleted successfully.`, 'success');
                                  },
                                  true
                                );
                              }}
                              className="p-2 bg-zinc-900 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-300 border border-zinc-800 rounded-lg transition-all cursor-pointer"
                              title="Delete Admin Account"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Box */}
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
                    <h3 className="font-display font-bold text-xs text-amber-400 uppercase tracking-widest">
                      {editAdminId ? 'Edit Admin Password & Settings' : 'Provision New Admin Account'}
                    </h3>

                    {editAdminId ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase text-zinc-300">Username</label>
                          <input
                            type="text"
                            value={editAdminUsername}
                            onChange={(e) => setEditAdminUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase text-zinc-300">New Password (leave blank to keep current)</label>
                          <input
                            type="password"
                            placeholder="Enter new password"
                            value={editAdminPassword}
                            onChange={(e) => setEditAdminPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id="editAdminEnabledCheckbox"
                            checked={editAdminEnabled}
                            onChange={(e) => setEditAdminEnabled(e.target.checked)}
                            className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                          />
                          <label htmlFor="editAdminEnabledCheckbox" className="text-xs text-zinc-300 font-medium cursor-pointer select-none">
                            Administrator Account Active / Enabled
                          </label>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            type="button"
                            onClick={async () => {
                              if (!editAdminUsername) {
                                showToast('Username cannot be empty.', 'error');
                                return;
                              }
                              if (editAdminPassword && editAdminPassword.length < 5) {
                                showToast('Password should be at least 5 characters long.', 'error');
                                return;
                              }
                              const success = await updateAdminUser(editAdminId, editAdminUsername, editAdminPassword || undefined, editAdminEnabled);
                              if (success) {
                                setEditAdminId(null);
                                setEditAdminUsername('');
                                setEditAdminPassword('');
                                showToast('Administrator account updated successfully.', 'success');
                              } else {
                                showToast('Failed to update administrator account.', 'error');
                              }
                            }}
                            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditAdminId(null)}
                            className="px-5 py-2.5 border border-zinc-700 text-xs text-zinc-300 rounded-xl hover:text-white cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase text-zinc-300">New Username</label>
                          <input
                            type="text"
                            placeholder="e.g. manager"
                            value={newAdminUsername}
                            onChange={(e) => setNewAdminUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase text-zinc-300">Password</label>
                          <input
                            type="password"
                            placeholder="Enter password"
                            value={newAdminPassword}
                            onChange={(e) => setNewAdminPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={async () => {
                            if (!newAdminUsername || !newAdminPassword) {
                              showToast('Please provide both username and password.', 'error');
                              return;
                            }
                            if (newAdminPassword.length < 5) {
                              showToast('Password must be at least 5 characters long.', 'error');
                              return;
                            }
                            const success = await createAdminUser(newAdminUsername, newAdminPassword);
                            if (success) {
                              setNewAdminUsername('');
                              setNewAdminPassword('');
                              showToast(`Administrator "${newAdminUsername}" provisioned successfully.`, 'success');
                            } else {
                              showToast('Failed to provision administrator account.', 'error');
                            }
                          }}
                          className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                        >
                          Provision New Admin
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Image Inspection Zoom Modal */}
      {previewImageUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden p-2 shadow-2xl">
            <button
              type="button"
              onClick={() => setPreviewImageUrl(null)}
              className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-black text-white rounded-full z-10 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[80vh] overflow-hidden flex items-center justify-center bg-zinc-950 rounded-xl">
              <SafeImage src={previewImageUrl} alt="Preview" className="max-h-[75vh] w-auto object-contain" />
            </div>
            <div className="p-3 text-center">
              <p className="font-mono text-xs text-zinc-400 truncate">{previewImageUrl}</p>
            </div>
          </div>
        </div>
      )}

      {/* Media Library Picker Modal */}
      {mediaPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-zinc-900 border border-zinc-700 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-display font-bold text-lg text-amber-400 flex items-center gap-2">
                  <Grid className="w-5 h-5" />
                  <span>Select Photo from Website Media Library</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Click any photo card to select it immediately, or paste a link / upload a file below
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMediaPickerOpen(false);
                  setMediaPickerCallback(null);
                }}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Link & File Upload Bar inside Modal */}
            <div className="p-4 bg-zinc-950 border-b border-zinc-800 space-y-3 shrink-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  placeholder="Paste Image URL or Google Drive share link here..."
                  value={pickerDirectUrl}
                  onChange={(e) => setPickerDirectUrl(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  type="button"
                  disabled={!pickerDirectUrl.trim()}
                  onClick={async () => {
                    const formatted = await addLinkToMediaLibrary(pickerDirectUrl.trim());
                    if (formatted) {
                      if (mediaPickerCallback) mediaPickerCallback(formatted);
                      setPickerDirectUrl('');
                      setMediaPickerOpen(false);
                      setMediaPickerCallback(null);
                    }
                  }}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Check className="w-4 h-4" />
                  <span>Use This Link</span>
                </button>

                <label className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shrink-0">
                  {pickerUploading ? <RefreshCw className="w-4 h-4 animate-spin text-amber-400" /> : <Upload className="w-4 h-4 text-amber-400" />}
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setPickerUploading(true);
                      await handleImageUpload(file, async (newUrl) => {
                        await addLinkToMediaLibrary(newUrl);
                        if (mediaPickerCallback) mediaPickerCallback(newUrl);
                        setMediaPickerOpen(false);
                        setMediaPickerCallback(null);
                      });
                      setPickerUploading(false);
                    }}
                  />
                </label>
              </div>

              {/* Search Bar inside Modal */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Filter indexed photos..."
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-amber-400/50"
                />
              </div>
            </div>

            {/* Media Items Grid */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {allIndexedWebsiteImages.filter(img => img.toLowerCase().includes(pickerSearch.toLowerCase())).length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-xs italic">
                  No matching images found in website media library. Paste an image URL or upload a file above.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {allIndexedWebsiteImages
                    .filter(img => img.toLowerCase().includes(pickerSearch.toLowerCase()))
                    .map((imgUrl, idx) => {
                      const formatted = formatImageUrl(imgUrl);
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (mediaPickerCallback) {
                              mediaPickerCallback(formatted);
                              setMediaPickerOpen(false);
                              setMediaPickerCallback(null);
                            } else {
                              setPreviewImageUrl(formatted);
                            }
                          }}
                          className="group relative h-32 rounded-xl overflow-hidden border border-zinc-800 hover:border-amber-400 bg-zinc-950 text-left transition-all flex flex-col justify-between cursor-pointer shadow-md hover:shadow-amber-400/10 active:scale-[0.98]"
                        >
                          <SafeImage src={imgUrl} alt={`Media item ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          
                          {/* Hover Selection Overlay */}
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center gap-1 z-10 pointer-events-none">
                            <CheckCircle className="w-8 h-8 text-amber-400" />
                            <span className="text-xs font-bold text-amber-400">Click to Select</span>
                          </div>

                          {/* Bottom Action Bar */}
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 flex items-center justify-between gap-1 z-20">
                            <span className="text-[10px] font-mono text-amber-400 font-bold truncate">Select Photo</span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                requestConfirmation(
                                  'Delete Image?',
                                  `Are you sure you want to delete this image (${imgUrl.split('/').pop()}) from all website sections? This will remove all image references and delete the file from storage if uploaded.`,
                                  async () => {
                                    await deleteImageFromAllContent(imgUrl);
                                  },
                                  true
                                );
                              }}
                              className="p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md shrink-0 cursor-pointer shadow-md"
                              title="Delete Image from Website"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMediaPickerOpen(false);
                  setMediaPickerCallback(null);
                }}
                className="px-5 py-2.5 bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Toast Notifications */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in duration-300 max-w-sm">
          <div className={`p-4 rounded-xl shadow-2xl border flex items-start gap-3 ${
            toast.type === 'success' 
              ? 'bg-zinc-950 border-emerald-500/30 text-emerald-300' 
              : toast.type === 'error'
              ? 'bg-zinc-950 border-rose-500/30 text-rose-300'
              : 'bg-zinc-950 border-amber-500/30 text-amber-300'
          }`}>
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-amber-400" />}
            </div>
            <div className="flex-1 text-xs leading-relaxed font-semibold">
              {toast.message}
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="shrink-0 text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmDialog && confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setConfirmDialog(null)}
          />
          
          {/* Dialog Container */}
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 animate-scale-up">
            <button
              type="button"
              onClick={() => setConfirmDialog(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl shrink-0 ${
                confirmDialog.isDestructive ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-400/10 text-amber-400'
              }`}>
                {confirmDialog.isDestructive ? (
                  <Trash2 className="w-6 h-6" />
                ) : (
                  <AlertTriangle className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-base text-zinc-100">
                  {confirmDialog.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                  {confirmDialog.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all cursor-pointer"
              >
                {confirmDialog.cancelText || 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmDialog.onConfirm) {
                    confirmDialog.onConfirm();
                  }
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-lg cursor-pointer ${
                  confirmDialog.isDestructive
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/10'
                    : 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-amber-900/10'
                }`}
              >
                {confirmDialog.confirmText || 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
