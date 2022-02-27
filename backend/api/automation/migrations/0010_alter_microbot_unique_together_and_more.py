# Generated by Django 4.0 on 2022-02-22 13:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('automation', '0009_alter_configuration_entries'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='microbot',
            unique_together={('Name', 'Version', 'Technology')},
        ),
        migrations.AlterUniqueTogether(
            name='specification',
            unique_together={('Name', 'Version')},
        ),
    ]