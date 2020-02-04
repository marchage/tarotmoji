"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("@nativescript/core/application");
var color_1 = require("@nativescript/core/color");
var platform_1 = require("@nativescript/core/platform");
var viewModule = require("@nativescript/core/ui/core/view");
var viewCommon = require("@nativescript/core/ui/core/view/view-common").ViewCommon;
var modalMap = new Map();
var DOMID = "_domId";
function saveModal(options) {
    modalMap.set(options.owner._domId, options);
}
function removeModal(domId) {
    modalMap.delete(domId);
}
function getModalOptions(domId) {
    return modalMap.get(domId);
}
var DialogFragmentStatic;
function overrideModalViewMethod() {
    viewModule.View.prototype._showNativeModalView = androidModal;
}
exports.overrideModalViewMethod = overrideModalViewMethod;
function androidModal(parent, options) {
    var _this = this;
    viewCommon.prototype._showNativeModalView.call(this, parent, options);
    if (!this.backgroundColor) {
        this.backgroundColor = new color_1.Color("transparent");
    }
    this.width = platform_1.screen.mainScreen.widthDIPs + 1;
    this.height = platform_1.screen.mainScreen.heightDIPs + 1;
    this.horizontalAlignment = "stretch";
    this.verticalAlignment = "stretch";
    this._setupUI(parent._context);
    this._isAddedToNativeVisualTree = true;
    var initializeDialogFragment = function () {
        if (DialogFragmentStatic) {
            return DialogFragmentStatic;
        }
        var CustomDialogImpl = (function (_super) {
            __extends(CustomDialogImpl, _super);
            function CustomDialogImpl(fragment, context, themeResId) {
                var _this = _super.call(this, context, themeResId) || this;
                _this.fragment = fragment;
                return global.__native(_this);
            }
            CustomDialogImpl.prototype.onDetachedFromWindow = function () {
                _super.prototype.onDetachedFromWindow.call(this);
                this.fragment = null;
            };
            CustomDialogImpl.prototype.onBackPressed = function () {
                var view = this.fragment.owner;
                var args = {
                    eventName: "activityBackPressed",
                    object: view,
                    activity: view._context,
                    cancel: false
                };
                application_1.android.notify(args);
                if (args.cancel) {
                    return;
                }
                view.notify(args);
                if (!args.cancel && !view.onBackPressed()) {
                    _super.prototype.onBackPressed.call(this);
                }
            };
            return CustomDialogImpl;
        }(android.app.Dialog));
        var CustomDialogFragmentImpl = (function (_super) {
            __extends(CustomDialogFragmentImpl, _super);
            function CustomDialogFragmentImpl() {
                var _this = _super.call(this) || this;
                return global.__native(_this);
            }
            CustomDialogFragmentImpl.prototype.onCreateDialog = function (savedInstanceState) {
                var ownerId = this.getArguments().getInt(DOMID);
                var options = getModalOptions(ownerId);
                this.owner = options.owner;
                this._fullscreen = options.fullscreen;
                this._cancelable = options.cancelable;
                this._stretched = options.stretched;
                this._dismissCallback = options.dismissCallback;
                this._shownCallback = options.shownCallback;
                this.setStyle(androidx.fragment.app.DialogFragment.STYLE_NO_TITLE, 0);
                var theme = this.getTheme();
                if (this._fullscreen) {
                    theme = this.getActivity().getApplicationInfo().theme;
                }
                var dialog = new CustomDialogImpl(this, this.getActivity(), theme);
                if (!this._fullscreen && !this._stretched) {
                    this.owner.horizontalAlignment = "center";
                    this.owner.verticalAlignment = "middle";
                }
                else {
                    this.owner.horizontalAlignment = "stretch";
                    this.owner.verticalAlignment = "stretch";
                }
                dialog.setCanceledOnTouchOutside(this._cancelable);
                var window = dialog.getWindow();
                window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                window.setDimAmount(options.dimAmount);
                return dialog;
            };
            CustomDialogFragmentImpl.prototype.onCreateView = function (inflater, container, savedInstanceState) {
                var owner = this.owner;
                owner._setupAsRootView(this.getActivity());
                owner._isAddedToNativeVisualTree = true;
                return owner.nativeViewProtected;
            };
            CustomDialogFragmentImpl.prototype.onStart = function () {
                _super.prototype.onStart.call(this);
                if (this._fullscreen) {
                    var window_1 = this.getDialog().getWindow();
                    var length_1 = android.view.ViewGroup.LayoutParams.MATCH_PARENT;
                    window_1.setLayout(length_1, length_1);
                    window_1.setBackgroundDrawable(null);
                }
                var owner = this.owner;
                if (owner && !owner.isLoaded) {
                    owner.callLoaded();
                }
                this._shownCallback();
            };
            CustomDialogFragmentImpl.prototype.onDismiss = function (dialog) {
                _super.prototype.onDismiss.call(this, dialog);
                var manager = this.getFragmentManager();
                if (manager) {
                    removeModal(this.owner._domId);
                    this._dismissCallback();
                }
                var owner = this.owner;
                if (owner && owner.isLoaded) {
                    owner.callUnloaded();
                }
            };
            CustomDialogFragmentImpl.prototype.onDestroy = function () {
                _super.prototype.onDestroy.call(this);
                var owner = this.owner;
                if (owner) {
                    if (owner.isLoaded) {
                        owner.callUnloaded();
                    }
                    owner._isAddedToNativeVisualTree = false;
                    owner._tearDownUI(true);
                }
            };
            return CustomDialogFragmentImpl;
        }(androidx.fragment.app.DialogFragment));
        DialogFragmentStatic = CustomDialogFragmentImpl;
    };
    initializeDialogFragment();
    var df = new DialogFragmentStatic();
    var args = new android.os.Bundle();
    args.putInt(DOMID, this._domId);
    df.setArguments(args);
    var dialogOptions = {
        owner: this,
        fullscreen: !!options.fullscreen,
        stretched: !!options.stretched,
        cancelable: options.android ? !!options.android.cancelable : true,
        shownCallback: function () { return _this._raiseShownModallyEvent(); },
        dismissCallback: function () { return _this.closeModal(); },
        dimAmount: options.dimAmount !== undefined ? +options.dimAmount : 0.5
    };
    saveModal(dialogOptions);
    this._dialogFragment = df;
    this._raiseShowingModallyEvent();
    this._dialogFragment.show(parent._getRootFragmentManager(), this._domId.toString());
}
//# sourceMappingURL=windowed-modal.android.js.map