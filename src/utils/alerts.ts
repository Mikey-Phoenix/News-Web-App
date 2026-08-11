import { useEffect } from 'react';
import Swal from 'sweetalert2';
import type  { SweetAlertIcon } from 'sweetalert2';

interface AlertTriggerProps {
    show: boolean;
    title: string;
    text?: string;
    icon?: SweetAlertIcon;
    onClose?: () => void;
}

export function AlertTrigger({ show, title, text, icon = "info", onClose }: AlertTriggerProps) {
    useEffect(() => {
        if (show) {
            Swal.fire({ title, text, icon }).then(() => {
                onClose?.();
            });
        }
    }, [show, title, text, icon, onClose]);

    return null; // it renders nothing itself, just triggers the alert as a side effect
}