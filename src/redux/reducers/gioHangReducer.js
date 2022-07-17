const stateDefault = {
    gioHang: [

    ],
    chiTietPost: { title: '', description: '', price: 0, imageUrl: '', createdAt: '' },
}

export const gioHangReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            let gh = [...state.gioHang];
            let gh1 = { ...action.sanPhamClick, soLuong: 1 };
            let sp = gh.find(item => item.id === gh1.id);
            if (sp) {
                sp.soLuong += 1;
            } else {
                gh.push(gh1);
            }

            state.gioHang = gh;
            return { ...state }

        }
        case 'TANG_GIAM_SO_LUONG': {
            let gh = [...state.gioHang];
            let ghTangGiam = gh.find(item => item.id === action.maSanPham);
            if (ghTangGiam) {
                ghTangGiam.soLuong += action.soLuong;
                if (ghTangGiam.soLuong < 1) {
                    if (window.confirm('Are sure want to delete?')) {
                        gh = gh.filter(item => item.id !== action.maSanPham);
                        state.gioHang = gh;
                        return { ...state }
                    }
                }
            }
            state.gioHang = gh;
            return { ...state }
        }
        case 'XOA_SP': {
            let gh = [...state.gioHang];
            gh = gh.filter(item => item.id !== action.sanPhamClick);
            state.gioHang = gh;
            return { ...state }
        }
        case 'XEM_CHI_TIET_POST_USER': {
            state.chiTietPost = action.xemChiTiet;
            return { ...state };
        }

        default: return state;
    }
}